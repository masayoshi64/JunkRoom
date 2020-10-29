<script>
MathJax = {
  loader: {load: ['[tex]/physics']},
  tex: {
    inlineMath: [['$', '$']],
    packages: {'[+]': ['physics']}
  },
  chtml: {
    matchFontHeight: false
  }
};
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

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

to be continued...



 # 物理と情報幾何学

##  information

「数理科学」2020/11 by 伊藤創祐

## abstract

## memo

### 熱力学第二法則

系の状態遷移がMarkov過程で記述できるとし、そのダイナミクスが以下のマスター方程式に従うとする
$$
\frac{d}{dt}dp_i(t) = \sum_j J_{ij}(t) = \sum_j W_{ij}(t)p_j(t)-W_{ji}(t)p_i(t)
$$

ここで熱力学的な力$F_{ij}$を以下のように定める。
$$
F_{ij}(t) = \ln\frac{W_{ij}(t)p_j(t)}{W_{ji}(t)p_i(t)}
$$
と定めると系とね強くの総エントロピーの生成率は
$$
\sigma(t) = \frac{1}{2}\sum_{(i, j)}J_{ij}(t)F_{ij}(t)
$$
とかける。

> $\because$
> $$
> \begin{align}
> \sigma(t) &= \frac{1}{2}\sum_{(i, j)}J_{ij}(t)F_{ij}(t)\\
> 					&= \frac{1}{2}\sum_{(i, j)}J_{ij}(t)\ln\frac{W_{ij}(t)p_j(t)}{W_{ji}(t)p_i(t)}\\
> 					&= \frac{1}{2}\sum_{(i, j)}J_{ij}(t)\left(\ln\frac{p_j(t)}{p_i(t)}+\ln\frac{W_{ij}(t)}{W_{ji}(t)}\right)\\
> 					&= -\sum_{(i, j)}J_{ij}(t)\ln{p_i(t)}+\frac{1}{2}\sum_{(i, j)}J_{ij}\ln\frac{W_{ij}(t)}{W_{ji}(t)}\\
> 					&= -\sum_{i}\dot{p_i}(t)\ln{p_i(t)}+\sum_{(i, j)}W_{ij}(t)p_i(t)\ln\frac{W_{ij}(t)}{W_{ji}(t)}\\
> \end{align}
> $$
> 系のエントロピー$H(t) = -\sum_i p_i(t)\ln{p_i(t)}$の時間変化は
> $$
> \dot H(t) = -\sum_i \dot p_i(t)\ln{p_i(t)}+\dot p_i(t)\\
>  = -\sum_i \dot p_i(t)\ln{p_i(t)}\quad(\because \sum_i\dot p_i(t) = 0)
> $$
> であり、今熱の出入りが
> $$
> q_{ij} = \ln\frac{W_{ij}(t)}{W_{ji}(t)}\
> $$
> でかけると仮定すれば、熱浴のエントロピー変化は$\beta q$とかけるので
>
> 確かに$\sigma(t)$が全体のエントロピー生成になっている。

今、$F, J$は同符号なので$\sigma\geq0$である。等号成立条件は、詳細釣り合い条件、つまり
$$
W_{ij}p_j = W_{ji}p_i
$$
が成り立つことである。

### 幾何学的解釈

マスター方程式から$p_i(t+dt) = p_i(t)+\sum_j J_{ij}dt$とかけるので

時刻$t$に状態$j$, 時刻$t+dt$に状態$i$にいる同時確率分布$\mathcal{P}_{(ij)}(t)$は
$$
\mathcal{P}_{(ij)}(t) = p_j\delta_{ij}+W_{ij}p_jdt\\
 = T_{(ij)}(t)p_j(t)
$$
ただし$T_{(ij)} = \delta_{ij}+W_{ij}dt$、つまり条件付き確率$Prob(i:t+dt|j:t)$のことである。

実はエントロピー生成は
$$
\sigma(t)dt = \sum_{(ij)}\mathcal{P}_{(ij)}\ln \frac{\mathcal{P}_{(ij)}}{\mathcal{P}_{(ji)}}\\
= \sum_{(ij)}\mathcal{P}_{(ij)}\ln \frac{\mathcal{P}_{(ij)}}{\mathcal{Q}^*_{(ij)}}\\
=D[{\mathcal{P}_{(ij)}}|{\mathcal{Q}^*_{(ij)}}]
$$
とかける。ただし、$\mathcal{Q}^*_{(ij)} = \mathcal{P}_{(ji)}$つまり$\mathcal{Q}^*_{(ij)}$は$dt$の間にjからiへ遷移する確率である。KLダイバージェンスの非負性より$\sigma(t)\geq 0$で等号成立条件は

今jにいてiからjに遷移してきた条件付き確率と少し前にjにいて今iに遷移してきた条件付き確率が等しいことつまり時間の順方向と逆方向の区別のつかない可逆な状態であることである。

### 射影

#### Backward manifold

> $$
> T_{(ji)}(t)\left[\sum_j \mathcal{Q}_{ji}\right] = \mathcal{Q}_{(ji)}
> $$
>
> を満たす同時確率分布のなす部分多様体$\mathcal{M}_B$。つまりは
> $$
> Q(j:t|i:t+dt) = P(j:t+dt|i:t)
> $$
> のように世界Pでの$i, i\to j$の確率と世界Qでの$j\to i, i$の確率が等しい。少し時間をずらして考えれば今$i$にいるとして、少し未来に$j$にいる確率と少し過去に$j$にいる確率が等しい。もっと言えば世界Qでは時間の進み方が逆だと思うと、世界Pと遷移確率が等しい。
>
> 一般に同時分布から条件月確率は定まるが、その逆$p_{ij}$を定めないと定まらないので$\mathcal{M}_B$は広がりを持っている。これは拘束条件が$\sum_{ij}\mathcal{P}_{ij} = 1$から$\forall i, \sum_j T_{ji} = 1$と増えるため自由度が減るからである。



