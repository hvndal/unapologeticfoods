"""Original score for reel 07: a tanpura-style drone on D with slow plucks, low swell and a soft room.
All synthesised here; no samples or third-party music.  python3 reels/score.py out.wav [seconds]"""
import sys, wave
import numpy as np

SR = 48000
dur = float(sys.argv[2]) if len(sys.argv) > 2 else 24.0
n = int(SR * dur)
t = np.arange(n) / SR
rng = np.random.default_rng(7)
out = np.zeros((n, 2))

def pluck(f, at, length=4.5, amp=0.18, pan=0.5):
    """Bright string with a buzzing bridge (jawari): many harmonics, upper ones decaying faster."""
    i0 = int(at * SR); m = min(int(length * SR), n - i0)
    if m <= 0: return
    tt = np.arange(m) / SR
    s = np.zeros(m)
    for h in range(1, 18):
        s += np.sin(2 * np.pi * f * h * tt * (1 + 0.0004 * h) + rng.random() * 6) * np.exp(-tt * (0.6 + 0.35 * h)) / h ** 0.9
    s = np.tanh(2.2 * s) * amp * (1 - np.exp(-tt * 300))
    out[i0:i0 + m, 0] += s * (1 - pan); out[i0:i0 + m, 1] += s * pan

D = 146.83  # D3 = Sa
pattern = [(1.5, 0.35), (2, 0.6), (2, 0.65), (1, 0.45)]  # Pa, Sa', Sa', Sa  (ratio, pan)
beat, k = 1.25, 0
tp = 0.8
while tp < dur - 3:
    r, pan = pattern[k % 4]
    pluck(D * r / 2 * (2 if r < 1.2 else 1), tp, amp=0.13 + 0.03 * (k % 4 == 0), pan=pan)
    tp += beat; k += 1

# low drone swell, breathing
env = np.clip(t / 4, 0, 1) * np.clip((dur - t) / 3, 0, 1)
drone = sum(np.sin(2 * np.pi * D / 2 * h * t + h) / h ** 1.3 for h in range(1, 7))
drone *= 0.07 * env * (0.75 + 0.25 * np.sin(2 * np.pi * t / 6.5))
out[:, 0] += drone; out[:, 1] += drone * 0.96

# one deep hit where the badge appears
i0 = int(18.4 * SR); tt = np.arange(n - i0) / SR
boom = np.sin(2 * np.pi * (55 * np.exp(-tt * 1.5) + 36) * tt) * np.exp(-tt * 0.9) * 0.35
out[i0:, 0] += boom; out[i0:, 1] += boom

# room: short exponential-noise reverb per channel
ir_len = int(2.6 * SR)
for c in range(2):
    ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR * 2.4)
    ir[:200] = 0
    wet = np.fft.irfft(np.fft.rfft(out[:, c], n + ir_len) * np.fft.rfft(ir, n + ir_len))[:n]
    out[:, c] = out[:, c] + 0.012 * wet

out *= np.clip((dur - t) / 1.5, 0, 1)[:, None]
out /= np.abs(out).max() / 0.8
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype('<i2').tobytes())
