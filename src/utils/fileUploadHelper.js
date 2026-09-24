/**
 * Compress image using Canvas to base64 data URL
 * Keeps resolution sharp while keeping storage size under 200KB.
 */
export const compressImage = (file, maxWidth = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Read audio file as base64 data URL
 */
export const readAudioFile = (file) => {
  return new Promise((resolve, reject) => {
    // Check file size (limit to 10MB to avoid freezing)
    if (file.size > 12 * 1024 * 1024) {
      reject(new Error('Ukuran file audio terlalu besar (maksimal 12MB).'));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
  });
};
