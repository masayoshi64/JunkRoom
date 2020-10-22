$$
\def\bra#1{\mathinner{\left\langle{#1}\right|}}
\def\ket#1{\mathinner{\left|{#1}\right\rangle}}
\def\braket#1#2{\mathinner{\left\langle{#1}\middle|#2\right\rangle}}
$$
# 1. 一般の状態
## 1.1 純粋状態
ヒルベルト空間上の単位ベクトルで表される状態。
## 1.2 混合状態
純粋状態が確率的に現れるような状態。
## 1.3 密度演算子
上の二つの状態を一般に記述する枠組みとして密度演算子がある。

密度演算子
- $\rho \geq 0$
- $\mathrm{Tr}\rho = 1$

この枠組みでは確率混合 = 密度演算子の凸結合である。

## 1.4 状態の実現

任意の混合状態は複合系の純粋状態から実現できる。系$A$の混合状態 $\{p_i:\ket\psi_i\}_{i = 1}^n$ に対してn次元の補助系$B$を用意し、その基底を $\{\ket e^{(b)}_i\}_{i = 1}^n$ とする。複合系$A\otimes B$において純粋状態 $\sum_i\sqrt{p_i} \ket\psi\ket e_i^{(b)}$ を考えることができる（ちゃんと単位ベクトルになっている！）のでこの部分トレースをとることで,
$$
\mathrm{Tr}_B \left[\left(\sum_i\sqrt{p_i} \ket\psi\ket e_i^{(b)}\right)\left(\sum_i\sqrt{p_i} \bra e_i^{(b)}\bra\psi\right)\right]  = \sum_j \bra e_j^{(b)}\left(\sum_i\sqrt{p_i} \ket\psi\ket e_i^{(b)}\right)\left(\sum_i\sqrt{p_i} \bra e_i^{(b)}\bra\psi\right)\ket e_j^{(b)}\\
= \sum_i p_i\ket\psi\bra\psi
$$
という混合状態を得ることができる（シュミット分解）。物理的には複合系$A\otimes B$において、$B$に関して$\{\ket e^{(b)}_i\}_{i = 1}^n$に対する射影測定を行いその情報を系$A$には伝えないことに相当する。

# 2. 一般の測定

## 2.1 オブザーバブル
オブザーバブル

任意のエルミート演算子
## 2.2 射影測定
オブザーバブル$A$が以下のようにスペクトル分解されるとする。
$$
A = \sum_{a} a P_a
$$
このとき、観測値は以下のような分布に従う。
$$
Prob(A = a) = \bra\psi P_a\ket\psi
$$
## 2.3 POVM測定

測定の確率分布の最も一般的な条件は以下の通り

- 状態の線形な関数である
- 常に非負で総和が1

これを実現するのがPOVM測定である。射影測定では直交基底への射影測定が行われたが、POVMでは非直交な測定も行うことができる。

POVM測定は$\sum_m E_m = I$, $E_m\geq 0$を満たす演算子の組$によって確率分布が
$$
Prob(M = m) = \mathrm{Tr}E_m\rho
$$
と定まる。

## 2.4 POVMの実現

系$A$の状態$\ket\psi, \rho_A$に対するPOVMを実現するために、補助系$B$を用意する。$B$の初期状態を純粋状態$\ket0, \sigma$としておく（何でもいい）。

今、全系の初期状態は$\rho\otimes\sigma$である。これをユニタリ変換$U$によって時間発展させた状態$U\ket\psi\ket0$を$B$の基底$\{\ket j\}_j$で分解すると以下のようになる。
$$
U\ket\psi\otimes\ket0 = \sum_j (K_j\ket\psi)\otimes\ket j
$$
ただし$M$はKraus演算子と呼ばれる演算子である。 $\ket\psi\to M_j\ket\psi$という変換は線形なので$M_j$は線形演算子である。また、$B$で射影測定を行うと、その観測確率は
$$
\mathrm{Prob}(M = j) = \bra\psi K_j^\dagger K_j\ket\psi\\
 = \mathrm{Tr}K_j^\dagger K_j\rho
$$
任意の半正定値演算子$E_i$が$K_j^\dagger K_j$と分解できることから、規格化条件$\sum_i K_i^\dagger K_i = I$を満たす任意の$K_j$が上の方法で実現できれば

POVMが実現可能となる。つまり、 変換
$$
\ket\psi\otimes\ket0 \to \sum_j (K_j\ket\psi)\otimes\ket j
$$
がユニタリであることを言えばいい。実は規格化条件からこれが成立する。

### 例[^1]

[^1]:「量子情報工学」p. 105

$\mathcal{H}_A = \mathbb{C}^2$において$\ket\psi_1 = \ket0, \ket\psi_1 = \cos\theta\ket0+\sin\theta\ket1$を誤りなしに区別したいという状況を考える。
$$
\begin{align}
E_1 &= \frac{1}{1+\cos\theta}(\sin\theta\ket 0-\cos\theta\ket1)(\sin\theta\bra 0-\cos\theta\bra1)\\
E_2 &= \frac{1}{1+\cos\theta}\ket 1\bra 1\\
E_3 &= I-E_1-E_2
\end{align}
$$
 はPOVMであり、確かに$\ket\psi_1, \ket\psi_2$を区別できることがわかる。ただし、 $M = 3$の時はどちらとも判別できなかったことになる。



# 3. 一般の時間発展

## 3.1 ユニタリ演算子による時間発展

任意のユニタリ演算子による時間発展が可能であると仮定する。

## 3.2 正写像と完全正写像

### 例[^2]

[^2]:「量子情報工学」p. 108

ユニバーサルNOTは正写像だが、完全正写像ではない（よって実現不可能）。

例えば$\frac{1}{\sqrt2}(\ket{00}+\ket{11})$を考える。

## 3.3 CPTP

時間発展の最も一般的な条件は

- アフィン性  確率のアフィン性より
- 完全正写像  任意の系との複合系を考えても正写像である必要がある。

である。

任意のCPTPはKraus演算子によって以下のように表現できる（Kraus表現）。
$$
\Lambda(A) = \sum K_iAK_i^\dagger
$$


<font color="Red">なぜ？</font>

2節で任意のKraus表現が複合系でのユニタリ発展で実現できることを見たので任意のCPTPが実現可能。

#  References

- 石坂 智 ほか，量子情報科学入門，共立出版，2012
- 冨田 章久，量子情報工学，森北出版，2017

