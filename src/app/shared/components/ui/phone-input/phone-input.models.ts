// src/app/shared/components/ui/phone-input/phone-input.models.ts

/**
 * Интерфейс для описания страны с телефонным кодом
 */
export interface Country {
  /** Код страны ISO 3166-1 alpha-2 (например, 'UA', 'US', 'PL') */
  code: string;
  /** Телефонный код страны (например, '+380', '+1', '+48') */
  dialCode: string;
  /** Название страны */
  name: string;
  /** Название страны на английском */
  nameEn: string;
  /** Emoji флаг страны (Unicode) */
  flag: string;
  /** Формат маски для номера телефона (без кода страны) */
  format: string;
  /** Placeholder для поля ввода */
  placeholder: string;
  /** Минимальная длина номера (без кода страны, только цифры) */
  minLength: number;
  /** Максимальная длина номера (без кода страны, только цифры) */
  maxLength: number;
  /** Приоритет в списке (для сортировки популярных стран) */
  priority?: number;
}

/**
 * Hardcoded список стран с телефонными кодами
 * Использует Unicode Emoji для флагов
 */
export const COUNTRIES: Country[] = [
  // Популярные страны (будут в начале списка)
  {
    code: 'UA',
    dialCode: '+380',
    name: 'Україна',
    nameEn: 'Ukraine',
    flag: '🇺🇦',
    format: '(##) ### ## ##',
    placeholder: '(50) 123 45 67',
    minLength: 9,
    maxLength: 9,
    priority: 1,
  },
  {
    code: 'US',
    dialCode: '+1',
    name: 'США',
    nameEn: 'United States',
    flag: '🇺🇸',
    format: '(###) ###-####',
    placeholder: '(555) 123-4567',
    minLength: 10,
    maxLength: 10,
    priority: 2,
  },
  {
    code: 'PL',
    dialCode: '+48',
    name: 'Польща',
    nameEn: 'Poland',
    flag: '🇵🇱',
    format: '### ### ###',
    placeholder: '123 456 789',
    minLength: 9,
    maxLength: 9,
    priority: 3,
  },

  // Остальные страны (по алфавиту)
  {
    code: 'GB',
    dialCode: '+44',
    name: 'Великобританія',
    nameEn: 'United Kingdom',
    flag: '🇬🇧',
    format: '#### ### ###',
    placeholder: '7400 123 456',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'DE',
    dialCode: '+49',
    name: 'Німеччина',
    nameEn: 'Germany',
    flag: '🇩🇪',
    format: '### #######',
    placeholder: '151 1234567',
    minLength: 10,
    maxLength: 11,
  },
  {
    code: 'FR',
    dialCode: '+33',
    name: 'Франція',
    nameEn: 'France',
    flag: '🇫🇷',
    format: '# ## ## ## ##',
    placeholder: '6 12 34 56 78',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'IT',
    dialCode: '+39',
    name: 'Італія',
    nameEn: 'Italy',
    flag: '🇮🇹',
    format: '### ### ####',
    placeholder: '312 345 6789',
    minLength: 9,
    maxLength: 10,
  },
  {
    code: 'ES',
    dialCode: '+34',
    name: 'Іспанія',
    nameEn: 'Spain',
    flag: '🇪🇸',
    format: '### ### ###',
    placeholder: '612 345 678',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'CA',
    dialCode: '+1',
    name: 'Канада',
    nameEn: 'Canada',
    flag: '🇨🇦',
    format: '(###) ###-####',
    placeholder: '(416) 123-4567',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'AU',
    dialCode: '+61',
    name: 'Австралія',
    nameEn: 'Australia',
    flag: '🇦🇺',
    format: '### ### ###',
    placeholder: '412 345 678',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'RU',
    dialCode: '+7',
    name: 'Росія',
    nameEn: 'Russia',
    flag: '🇷🇺',
    format: '(###) ###-##-##',
    placeholder: '(912) 345-67-89',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'BY',
    dialCode: '+375',
    name: 'Білорусь',
    nameEn: 'Belarus',
    flag: '🇧🇾',
    format: '(##) ###-##-##',
    placeholder: '(29) 123-45-67',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'KZ',
    dialCode: '+7',
    name: 'Казахстан',
    nameEn: 'Kazakhstan',
    flag: '🇰🇿',
    format: '(###) ###-##-##',
    placeholder: '(701) 234-56-78',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'MD',
    dialCode: '+373',
    name: 'Молдова',
    nameEn: 'Moldova',
    flag: '🇲🇩',
    format: '#### ####',
    placeholder: '7912 3456',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: 'LT',
    dialCode: '+370',
    name: 'Литва',
    nameEn: 'Lithuania',
    flag: '🇱🇹',
    format: '(###) #####',
    placeholder: '(612) 34567',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: 'LV',
    dialCode: '+371',
    name: 'Латвія',
    nameEn: 'Latvia',
    flag: '🇱🇻',
    format: '## ### ###',
    placeholder: '21 234 567',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: 'EE',
    dialCode: '+372',
    name: 'Естонія',
    nameEn: 'Estonia',
    flag: '🇪🇪',
    format: '#### ####',
    placeholder: '5123 4567',
    minLength: 7,
    maxLength: 8,
  },
  {
    code: 'CZ',
    dialCode: '+420',
    name: 'Чехія',
    nameEn: 'Czech Republic',
    flag: '🇨🇿',
    format: '### ### ###',
    placeholder: '601 123 456',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'SK',
    dialCode: '+421',
    name: 'Словаччина',
    nameEn: 'Slovakia',
    flag: '🇸🇰',
    format: '### ### ###',
    placeholder: '912 123 456',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'TR',
    dialCode: '+90',
    name: 'Туреччина',
    nameEn: 'Turkey',
    flag: '🇹🇷',
    format: '(###) ### ## ##',
    placeholder: '(532) 123 45 67',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'IL',
    dialCode: '+972',
    name: 'Ізраїль',
    nameEn: 'Israel',
    flag: '🇮🇱',
    format: '##-###-####',
    placeholder: '50-123-4567',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: 'JP',
    dialCode: '+81',
    name: 'Японія',
    nameEn: 'Japan',
    flag: '🇯🇵',
    format: '##-####-####',
    placeholder: '90-1234-5678',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: 'CN',
    dialCode: '+86',
    name: 'Китай',
    nameEn: 'China',
    flag: '🇨🇳',
    format: '### #### ####',
    placeholder: '131 2345 6789',
    minLength: 11,
    maxLength: 11,
  },
  {
    code: 'IN',
    dialCode: '+91',
    name: 'Індія',
    nameEn: 'India',
    flag: '🇮🇳',
    format: '##### #####',
    placeholder: '81234 56789',
    minLength: 10,
    maxLength: 10,
  },
];

/**
 * Функция для получения страны по коду
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/**
 * Функция для получения страны по телефонному коду
 */
export function getCountryByDialCode(dialCode: string): Country | undefined {
  return COUNTRIES.find((c) => c.dialCode === dialCode);
}

/**
 * Функция для сортировки стран (популярные сначала, потом по алфавиту)
 */
export function getSortedCountries(): Country[] {
  return [...COUNTRIES].sort((a, b) => {
    // Сначала по приоритету (если есть)
    if (a.priority && b.priority) {
      return a.priority - b.priority;
    }
    if (a.priority) return -1;
    if (b.priority) return 1;

    // Потом по названию
    return a.name.localeCompare(b.name);
  });
}
