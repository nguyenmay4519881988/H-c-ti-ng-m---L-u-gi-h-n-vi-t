import { Language, Level, Lesson, CultureDetail } from './types';

const generateLessons = (levelIdx: number): Lesson[] => {
  const titles = [
    ['Chào hỏi', 'Gia đình', 'Số đếm', 'Màu sắc', 'Kiểm tra level 1'],
    ['Trường học', 'Cơ thể', 'Thời tiết', 'Thời gian', 'Kiểm tra level 2'],
    ['Đồ ăn', 'Quần áo', 'Nhà cửa', 'Bản làng', 'Kiểm tra level 3']
  ];

  return titles[levelIdx].map((title, i) => ({
    id: `lesson-${levelIdx}-${i}`,
    title: `Bài ${i + 1}: ${title}`,
    description: `Khám phá kiến thức về ${title} trong văn hóa bản địa.`,
    unlocked: true, // Unlock all lessons for demo purposes
    stars: Math.floor(Math.random() * 4),
    vocabularies: [
      {
        id: 'v1',
        vietnamese: 'Chào bạn',
        ethnic: 'Pình lả',
        phonetic: '/pinh-la/',
        image: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'v2',
        vietnamese: 'Cảm ơn',
        ethnic: 'Khộp chay',
        phonetic: '/khop-chay/',
        image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'v3',
        vietnamese: 'Bạn khỏe không?',
        ethnic: 'Mái hặc',
        phonetic: '/mai-hac/',
        image: 'https://images.unsplash.com/photo-1508913922359-8386c1236811?auto=format&fit=crop&q=80&w=400'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: `Từ nào có nghĩa là "${titles[levelIdx][i]}"?`,
        options: ['Pình lả', 'Khộp chay', 'Mái hặc', 'Sái múa'],
        correct: 0,
        type: 'text'
      }
    ]
  }));
};

const generateLevels = (): Level[] => {
  const levelNames = [
    { name: 'LEVEL 1 — Làm quen', desc: 'Những bước chân đầu tiên vào ngôn ngữ mẹ đẻ.' },
    { name: 'LEVEL 2 — Cuộc sống hằng ngày', desc: 'Giao tiếp cơ bản trong sinh hoạt thường nhật.' },
    { name: 'LEVEL 3 — Văn hóa dân tộc', desc: 'Tìm hiểu về di sản và phong tục đặc sắc.' }
  ];

  return levelNames.map((lv, i) => ({
    id: `level-${i}`,
    name: lv.name,
    description: lv.desc,
    isLocked: false,
    lessons: generateLessons(i)
  }));
};

export const LANGUAGES_DATA: Language[] = [
  {
    id: 'thai',
    name: 'Tiếng Thái',
    ethnic: 'Dân tộc Thái',
    icon: '👘',
    color: 'bg-emerald-50',
    progress: 15,
    levels: generateLevels()
  },
  {
    id: 'mong',
    name: 'Tiếng Mông',
    ethnic: 'Dân tộc Mông',
    icon: '🏔️',
    color: 'bg-amber-50',
    progress: 5,
    levels: generateLevels()
  },
  {
    id: 'khomu',
    name: 'Tiếng Khơ Mú',
    ethnic: 'Dân tộc Khơ Mú',
    icon: '🎋',
    color: 'bg-rose-50',
    progress: 0,
    levels: generateLevels()
  }
];

export const CULTURE_DATA: CultureDetail[] = [
  {
    id: 'ao-com-thai',
    title: 'Áo Cỏm Thái',
    ethnicTitle: 'Sửa Cỏm',
    phoneticEthnicTitle: 'Xửa cỏm',
    subtitle: 'Vẻ đẹp duyên dáng của phụ nữ Thái',
    category: 'fashion',
    ethnic: 'Thái',
    image: 'https://images.unsplash.com/photo-1541018939203-36eeab6d9f21?auto=format&fit=crop&q=80&w=800',
    description: 'Áo cỏm là loại áo xẻ ngực, bó sát người, tôn lên vẻ đẹp thanh thoát của người phụ nữ Thái. Đặc biệt khi kết hợp với hoa Ban trắng vùng cao.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&q=80&w=400'
    ],
    content: {
      origin: 'Bắt nguồn từ truyền thống lâu đời của người Thái Đen và Thái Trắng vùng Tây Bắc.',
      meaning: 'Thể hiện sự khéo léo, cần cù và vẻ đẹp tâm hồn của người phụ nữ.',
      features: ['Hàng khuy bướm (mắc pém)', 'Cổ áo hình chữ V', 'Chất liệu vải mềm mại'],
      usage: 'Mặc hàng ngày và đặc biệt không thể thiếu trong các dịp lễ hội, cưới hỏi.'
    }
  },
  {
    id: 'pa-pinh-top',
    title: 'Pa Pỉnh Tộp',
    ethnicTitle: 'Pa Pỉnh Tộp',
    phoneticEthnicTitle: 'Pa pỉnh tộp',
    subtitle: 'Cá suối nướng đặc sản',
    category: 'food',
    ethnic: 'Thái',
    image: 'https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&q=80&w=800',
    description: 'Món cá suối nướng gập đặc trưng của người Thái với hương vị mắc khén tê đầu lưỡi.',
    content: {
      origin: 'Là món ăn ẩm thực truyền thống, thường dùng đãi khách quý.',
      meaning: 'Tượng trưng cho sự nồng hậu và lòng hiếu khách của người dân bản mường.',
      features: ['Gia vị Mắc khén, hạt dổi', 'Cá suối tươi sống', 'Nướng trên than củi rực hồng'],
      usage: 'Thường ăn kèm với xôi ngũ sắc (khẩu cắm).'
    }
  },
  {
    id: 'khen-mong',
    title: 'Khèn Mông',
    ethnicTitle: 'Kềnh Mông',
    phoneticEthnicTitle: 'Kềnh mông',
    subtitle: 'Thanh âm vang vọng đại ngàn',
    category: 'music',
    ethnic: 'Mông',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'Khèn không chỉ là nhạc cụ mà còn là linh hồn, là tiếng lòng của người đàn ông Mông.',
    content: {
      origin: 'Gắn liền với truyền thuyết về tổ tiên người Mông từ ngàn đời xưa.',
      meaning: 'Giao tiếp với thần linh, ông bà và dùng để tỏ tình trong các dịp hội xuân.',
      features: ['Làm từ gỗ pơ mu và 6 ống trúc', 'Âm thanh đa tầng', 'Động tác múa khèn điêu luyện'],
      usage: 'Sử dụng trong đám tang, lễ hội Gầu Tào và sinh hoạt cộng đồng.'
    }
  },
  {
    id: 'gau-tao',
    title: 'Lễ hội Gầu Tào',
    ethnicTitle: 'Gầu Tào',
    phoneticEthnicTitle: 'Gầu tào',
    subtitle: 'Lễ hội truyền thống lớn nhất của người Mông',
    category: 'fest',
    ethnic: 'Mông',
    image: 'https://images.unsplash.com/photo-1508913922359-8386c1236811?auto=format&fit=crop&q=80&w=800',
    description: 'Lễ hội cầu phúc, cầu may cho bản mường, thường tổ chức vào dịp đầu năm mới.',
    content: {
      origin: 'Bắt nguồn từ việc cầu tự (xin con) của người Mông.',
      meaning: 'Gắn kết cộng đồng, tạ ơn trời đất và cầu mong một mùa màng bội thu.',
      features: ['Dựng cây nêu', 'Hát giao duyên', 'Các trò chơi dân gian: ném pa pao, múa khèn'],
      usage: 'Diễn ra từ mùng 2 đến mùng 4 Tết âm lịch.'
    }
  },
  {
    id: 'nha-san-thai',
    title: 'Nhà sàn Thái',
    ethnicTitle: 'Hươn Sản',
    phoneticEthnicTitle: 'Hươn sản',
    subtitle: 'Kiến trúc gỗ tinh xảo',
    category: 'arch',
    ethnic: 'Thái',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80&w=800',
    description: 'Nhà sàn người Thái được ví như một tác phẩm nghệ thuật kiến trúc giữa núi rừng.',
    content: {
      origin: 'Phù hợp với địa hình đồi núi và tránh thú dữ.',
      meaning: 'Mỗi gian nhà đều có ý nghĩa tâm linh và chức năng riêng biệt.',
      features: ['Kiến trúc 3 gian hoặc 5 gian', 'Hàng cột gỗ tròn chắc chắn', 'Khau cút - biểu tượng trên mái nhà Thái Đen'],
      usage: 'Là không gian sống, sinh hoạt văn hóa và thờ cúng tổ tiên.'
    }
  },
  {
    id: 'men-men',
    title: 'Mèn mén',
    ethnicTitle: 'Chủa Blo',
    phoneticEthnicTitle: 'Chủa blô',
    subtitle: 'Hương vị ngô núi đá',
    category: 'food',
    ethnic: 'Mông',
    image: 'https://images.unsplash.com/photo-1541018939203-36eeab6d9f21?auto=format&fit=crop&q=80&w=800',
    description: 'Món cơm ngô hấp truyền thống, là thực phẩm chính trong đời sống hàng ngày của người Mông trên cao nguyên đá.',
    content: {
      origin: 'Do điều kiện địa hình khô hạn, không trồng được lúa nước.',
      meaning: 'Thể hiện sự kiên cường và tinh thần vượt khó của người dân vùng cao.',
      features: ['Làm từ ngô tẻ địa phương', 'Hấp 2 lần để chín kỹ', 'Ăn kèm canh cải hoặc đậu chao'],
      usage: 'Sử dụng hàng ngày và trong các lễ nghi quan trọng.'
    }
  },
  {
    id: 'tinh-tau',
    title: 'Đàn Tính Tẩu',
    ethnicTitle: 'Tính Tẩu',
    phoneticEthnicTitle: 'Tính tẩu',
    subtitle: 'Tiếng đàn tơ vương',
    category: 'music',
    ethnic: 'Tày',
    image: 'https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&q=80&w=800',
    description: 'Nhạc cụ truyền thống của người Tày, Nùng, dùng để đệm cho các bài hát Then.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: {
      origin: 'Bầu đàn làm bằng quả bầu khô, cần đàn dài bằng gỗ.',
      meaning: 'Kết nối giữa con người và thế giới tâm linh thông qua những giai điệu Then.',
      features: ['Bầu đàn bằng quả bầu tròn', 'Cần đàn không có phím', 'Âm thanh trầm ấm, vang xa'],
      usage: 'Chủ yếu dùng trong các nghi lễ Lẩu Then và liên hoan văn nghệ.'
    }
  }
];

export const findLessonById = (id: string): Lesson | undefined => {
  for (const lang of LANGUAGES_DATA) {
    for (const level of lang.levels) {
      const lesson = level.lessons.find(l => l.id === id);
      if (lesson) return lesson;
    }
  }
  return undefined;
};
