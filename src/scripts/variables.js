const CDN_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://searoad-s-cdn.s3.ap-northeast-2.amazonaws.com/"
    : "https://searoad-s-cdn.s3.ap-northeast-2.amazonaws.com/"
const CDN_IMAGE_URL = CDN_URL + "images/"
const CDN_LOGO_URL = CDN_URL + "logo/"

export const VARS = {
  PATH: {
    CDN_URL: CDN_URL,
    IMAGE_URL: CDN_IMAGE_URL,
    LOGO_URL: CDN_LOGO_URL,
  },
};
