export interface Medicine {
  id: number;
  fullName: string; // e.g. "Ácido Tranexámico (Amchafibrin)"
  genericName: string; // e.g. "Ácido Tranexámico"
  brandNames: string[]; // e.g. ["Amchafibrin"]
  composition: string;
  indications: string;
  contraindications: string;
  dosage: string;
  presentation: string;
  adverseReactions: string;
  warningsPrecautions: string;
  category: MedicineCategory;
  isCritical: boolean;
}

export type MedicineCategory =
  | "Anestésicos y Sedantes"
  | "Analgésicos y Opioides"
  | "Cardiovascular e Inotrópicos"
  | "Anticoagulantes y Hemostáticos"
  | "Anticonvulsionantes y Antiepilépticos"
  | "Gastrointestinales y Antieméticos"
  | "Hormonas y Obstetricia"
  | "Fluidos, Electrolitos y Nutrición"
  | "Psicofármacos"
  | "Vitaminas y Otros";

export interface DrugInteraction {
  drug1Id: number;
  drug2Id: number;
  severity: "Alta" | "Moderada" | "Leve";
  mechanism: string;
  recommendation: string;
}

export interface InteractionReport {
  medicines: Medicine[];
  severity: "Alta" | "Moderada" | "Leve" | "Ninguna";
  details: InteractionDetail[];
  aiAnalysis?: string; // If processed by Gemini
}

export interface InteractionDetail {
  drugs: [Medicine, Medicine];
  severity: "Alta" | "Moderada" | "Leve";
  mechanism: string;
  recommendation: string;
}
