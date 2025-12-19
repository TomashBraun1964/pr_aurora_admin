export interface AvIcon {
  name: string; // Имя для отображения и поиска
  type: string; // Имя для передачи в app-icon (полный путь без расширения)
  category: string; // Категория (папка)
}

export interface AvIconCategory {
  category: string;
  icons: AvIcon[];
}
