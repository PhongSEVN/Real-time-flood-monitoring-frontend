export interface Member {
  key: string;
  name: string;
  relation: string;
  age: number;
  health: string;
  note: string;
}

export interface Asset {
  key: string;
  name: string;
  quantity: number;
  value: string;
  status: string;
}

export interface Household {
  id: number;
  owner: string;
  address: string;
  phone: string;
  type: string;
  structure: string;
  area: string;
  floorLevel: string;
  builtYear: string;
  members: Member[];
  assets: Asset[];
  business: {
    isBusiness: boolean;
    type: string;
    field: string;
    license: string;
    items: string;
    risk: string;
  };
  environment: {
    waste: string;
    waterSource: string;
    drainage: string;
    sanitation: string;
    floodHistory: string;
  };
}

const STORAGE_KEY = "flood_monitoring_households";

const initialHouseholds: Household[] = [
  {
    id: 1,
    owner: "Nguyễn Văn A",
    address: "123 Đường Lê Văn Việt, Phường Tăng Nhơn Phú A, TP. Thủ Đức",
    phone: "0909123456",
    type: "Nhà cấp 4",
    structure: "Tường gạch, mái tôn, có gác lửng",
    area: "80m2 (5m x 16m)",
    floorLevel: "Thấp hơn mặt đường 0.5m (Nguy cơ ngập cao)",
    builtYear: "2010",
    members: [
      {
        key: "1",
        name: "Nguyễn Văn A",
        relation: "Chủ hộ",
        age: 50,
        health: "Bình thường",
        note: "Biết bơi",
      },
      {
        key: "2",
        name: "Trần Thị B",
        relation: "Vợ",
        age: 48,
        health: "Tiểu đường nhẹ",
        note: "Cần thuốc định kỳ",
      },
      {
        key: "3",
        name: "Lê Thị D",
        relation: "Mẹ",
        age: 75,
        health: "Yếu, khó đi lại",
        note: "Cần hỗ trợ di tản đặc biệt",
      },
    ],
    assets: [
      { key: "1", name: "Xe máy Honda Vision", quantity: 1, value: "35 triệu", status: "Để tầng trệt" },
      { key: "2", name: "Tủ lạnh Side-by-side", quantity: 1, value: "20 triệu", status: "Kê cao 20cm" },
    ],
    business: {
      isBusiness: true,
      type: "Hộ kinh doanh cá thể",
      field: "Tạp hóa tổng hợp",
      license: "KD-12345678",
      items: "Bánh kẹo, nước giải khát",
      risk: "Hàng hóa để thấp, dễ hư hỏng khi ngập",
    },
    environment: {
      waste: "Thu gom rác hàng ngày",
      waterSource: "Nước máy thủy cục",
      drainage: "Hệ thống thoát nước cũ",
      sanitation: "Nhà vệ sinh tự hoại",
      floodHistory: "Ngập 0.5m đợt tháng 10/2023",
    },
  },
  {
    id: 2,
    owner: "Lê Văn Tám",
    address: "456 Đường Đỗ Xuân Hợp, Phường Phước Long B, TP. Thủ Đức",
    phone: "0912345678",
    type: "Nhà phố 3 tầng",
    structure: "Bê tông cốt thép",
    area: "100m2 (5m x 20m)",
    floorLevel: "Cao hơn mặt đường 0.2m",
    builtYear: "2018",
    members: [
      {
        key: "1",
        name: "Lê Văn Tám",
        relation: "Chủ hộ",
        age: 35,
        health: "Tốt",
        note: "",
      },
      {
        key: "2",
        name: "Phạm Thị Hoa",
        relation: "Vợ",
        age: 32,
        health: "Mang thai tháng thứ 8",
        note: "Ưu tiên di tản y tế",
      },
    ],
    assets: [
      { key: "1", name: "Ô tô Mazda 3", quantity: 1, value: "600 triệu", status: "Để trong nhà" },
    ],
    business: {
      isBusiness: false,
      type: "",
      field: "",
      license: "",
      items: "",
      risk: "",
    },
    environment: {
      waste: "Thu gom rác hàng ngày",
      waterSource: "Nước máy",
      drainage: "Tốt",
      sanitation: "Tự hoại",
      floodHistory: "Chưa từng ngập vào nhà",
    },
  },
];

export const householdService = {
  getHouseholds: (): Household[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHouseholds));
      return initialHouseholds;
    } catch (error) {
      console.error("Error getting households", error);
      return [];
    }
  },

  addHousehold: (household: Omit<Household, "id">): Household => {
    const households = householdService.getHouseholds();
    const newHousehold: Household = {
      ...household,
      id: Date.now(),
    };
    const updatedHouseholds = [newHousehold, ...households];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHouseholds));
    
    window.dispatchEvent(new Event("households-updated"));
    return newHousehold;
  },

  updateHousehold: (updatedHousehold: Household): void => {
    const households = householdService.getHouseholds();
    const newHouseholds = households.map((h) =>
      h.id === updatedHousehold.id ? updatedHousehold : h
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHouseholds));
    window.dispatchEvent(new Event("households-updated"));
  },
};
