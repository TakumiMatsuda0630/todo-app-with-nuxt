export function useUlidGenerator() {
    const generateUlId = () => {
        const timestamp = Date.now(); // 現在のタイムスタンプ（ミリ秒）
    
      // タイムスタンプ部分をULID形式に変換（48ビット）
      const timestampHex = timestamp.toString(16).padStart(12, '0'); // 12桁の16進数に変換
      
      // ランダム部分（80ビット）を生成
      const randomPart = Array.from({ length: 16 })
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
      
      return timestampHex + randomPart;
    };

    return {
        generateUlId,
    };
}