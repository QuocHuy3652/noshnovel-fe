export const toSlug = (str: String) => {
  str = str.toLowerCase();
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '');

  return str;
};

export const updateHistory = (
  server: string | null,
  novelSlug: string | null,
  newChapterSlug: string | null,
  newChapterLabel: string | undefined,
) => {
  // Get the current history from localStorage
  let history = JSON.parse(localStorage.getItem('history') || '[]');

  // Find the chapter with the same novelSlug and server
  const existingIndex = history.findIndex((item: any) => item.novelSlug === novelSlug && item.server === server);

  // If it exists, update its url and chapterLabel
  if (existingIndex !== -1) {
    history[existingIndex].url = `novel-reader?server=${server}&novelSlug=${novelSlug}&chapterSlug=${newChapterSlug}`;
    history[existingIndex].chapterLabel = newChapterLabel;

    // Move the updated item to the beginning of the history
    const updatedItem = history.splice(existingIndex, 1)[0];
    history.unshift(updatedItem);
  }

  // Save the history back to localStorage
  localStorage.setItem('history', JSON.stringify(history));
};

export const insertToHistory = (chapter: any, props: any, server: string) => {
  let history = JSON.parse(localStorage.getItem('history') || '[]');

  let newChapter = {
    coverImage: props.coverImage,
    title: props.title,
    url: `/novel-reader?server=${server}&novelSlug=${props.novelSlug}&chapterSlug=${chapter.slug}`,
    novelSlug: props.novelSlug,
    chapterLabel: chapter.label,
    server: server,
  };

  const existingIndex = history.findIndex(
    (item: any) => item.novelSlug === newChapter.novelSlug && item.server === newChapter.server,
  );

  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }

  history.unshift(newChapter);

  if (history.length > 15) {
    history.pop();
  }

  localStorage.setItem('history', JSON.stringify(history));
};
