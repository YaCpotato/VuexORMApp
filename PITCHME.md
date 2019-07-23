---?color=#040000

## This is the sample slide used gitpitch

---?color=#040000
## 見出しについて
---?color=#040000
# 見出し1
## 見出し2
---?color=#040000
### 見出し3
#### 見出し4
---?color=#040000
## Flagments  (一個ずつ小出しにしたい時に使う)
---?color=#040000
fragmentオプションをつけたもの一つのみがスライド内容の場合、その手前に空白が一枚追加される
---?color=#040000
@css[text-blue fragment](Hello, World!（空白のスライドが一枚置かれたはず）)
---?color=#040000
@box[text-orange span-80 fragment](Mars Attacks # Greetings earthlings. We come in peace!（空白のスライドが一枚置かれたはず）)
---?color=#040000
@img[fragment](src/assets/logo.png)
---?color=#040000
@fa[smile-o fa-4x fa-spin fragment](めっちゃまわる)
---?color=#040000
@snap[west]
# Hello
@snapend

@snap[east fragment]
# World!
@snapend
---?color=#040000
テーブルも一行ずつ描画される
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>25</td>
  </tr>
  <tr class="fragment">
    <td>Eve</td>
    <td>94</td>
  </tr>
  <tr class="fragment">
    <td>John</td>
    <td>43</td>
  </tr>
</table>
---?color=#040000
＜class = fragment指定がないものが先＞
<h2 class="fragment">Hello, World!</h2>
<h2>Hello, World!</h2>
---?color=#040000
