# 読んだやつまとめ
# Correspodence between thermodynamics and inference
## link
https://arxiv.org/abs/1706.01428
## abstract
熱力学と学習理論の対応
## memo

### 基本的な対応

| Thermodynamics                                 | Statistics                                                   |
| ---------------------------------------------- | ------------------------------------------------------------ |
| $\beta$: 逆温度                                | $N$: サンプルのサイズ                                        |
| $\theta$: 状態                                 | $\theta$: パラメタ                                           |
| $X^N$: Quenched disorder                       | $X^N$: データセット                                          |
| $E_X(\theta)$: エネルギー                      | $H_X(\theta) = E_X[p(X|\theta)]$: クロスエントロピー（KLダイバージェンスにすると$E_0 = 0$となる） |
| $E_0$: $X^N$で平均した最低エネルギー           | $H_0$: シャノンエントロピー（$p(X|\theta)$が真の分布の時の$H_X(\theta)$） |
| $\rho(\theta)$: 状態密度                       | $\omega(\theta)$: 事前分布                                   |
| $Z$: 分配関数                                  | $Z$: evidence                                                |
| $\frac{\exp(-\beta E_X)}{Z}$: ボルツマンの重み | $\omega(\theta|X^N)$: 事後分布                               |

### 自由粒子と正則モデル

|                    | K次元の自由粒子                                     | K次元の正則モデル                       |
| ------------------ | --------------------------------------------------- | --------------------------------------- |
| 自由エネルギー $F$ | $E_0+\frac{K}{2\beta}\log\frac{\beta}{\beta_0}$[^1] | $H_0+\frac{K}{2N}\log\frac{N}{N_0}$[^2] |
| 平均エネルギー U   | $E_0+\frac{2K}{\beta}$                              | $H_0+\frac{2K}{N}$: LOOCV               |

[^1]: $\beta_0 = \frac{2\pi mL^2}{h^2}$
[^2]: $N_0 = ?$

1. 自由エネルギーの$K$は当分配則の結果と考えられる.
2. $H_0-U$はGE: 汎化誤差