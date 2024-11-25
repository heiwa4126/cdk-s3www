# cdk-s3www

AWS CDK で
ランダムな名前の S3 バケットを作り、
./www の中身をアップロードするサンプルコード。

## 手順

```sh
pnpm i
pnpm run deploy
#
pnpm run diff
#
pnpm run destroy
```

## 感想

- 簡単に書ける
- content-type や etag もちゃんとつけてくれる
- content-encoding は自動ではやってくれない
- **ものすごく遅い** `aws s3 sync` のほうがいいんじゃないか
- 削除用の lambda と role が生える
- S3 にアップロードすることが頻繁にあるプロジェクトなら Terraform で書いた方がいいと思う。ファイルを 1 個、とか CDK で 1 発、をめざすならこっちの方が。
