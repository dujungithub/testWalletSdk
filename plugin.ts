import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('#root').after([
      `
        <script src="https://gistcdn.githack.com/thecookfrankie/56aa7096db6ffc0fc10c9d500b2f053e/raw/04f956168c140ab5a66708d18f31b49f7b1f06bc/cubic-snsauth-sdk.0.0.4.umd.min.js"></script>
        <script>
          if (window.snsauth) {
            window.snsauth.initAuthAgent();
            console.log('snsauth inited');
          } else {
            console.error('missing snsauth');
          }
        </script>
      `,
    ])
    return $;
  });
};
