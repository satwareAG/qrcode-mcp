import QRCode from "qrcode";

interface QRCodeOptions {
  width?: number; // 二维码宽度
  margin?: number; // 二维码边距
  color?: {
    dark?: string; // 二维码颜色
    light?: string; // 背景颜色
  };
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"; // 错误纠正级别
}

/**
 * 生成二维码
 * @param text 要转换成二维码的文本
 * @param options 二维码配置选项
 * @returns Promise<string> 返回 base64 格式的二维码图片
 */
async function generateQRCode(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  try {
    const defaultOptions: QRCodeOptions = {
      width: 256,
      margin: 4,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    };

    // 合并默认选项和用户选项
    const qrOptions = { ...defaultOptions, ...options };

    // 生成二维码（返回 base64 格式）
    const qrCodeImage = await QRCode.toDataURL(text, qrOptions);
    return qrCodeImage;
  } catch (error) {
    console.error("generateQRCode error:", error);
    throw error;
  }
}

export { generateQRCode, QRCodeOptions };
