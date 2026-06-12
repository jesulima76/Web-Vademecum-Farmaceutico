import { Medicine, DrugInteraction, MedicineCategory } from "../types";
import { getAdditionalMedicines } from "./additional_medicines";

export const CATEGORIES: { category: MedicineCategory; description: string; count: number }[] = [
  {
    category: "Anestésicos y Sedantes",
    description: "Inductores del sueño, sedantes conscientes y relajantes musculares utilizados en cirugía y UCI.",
    count: 5 // Midazolam, Propofol, Rocuronio, Ketamina, (will dynamically compute, but nice metadata)
  },
  {
    category: "Analgésicos y Opioides",
    description: "Medicamentos potentes para el alivio del dolor agudo y/o crónico, incluyendo AINEs y opioides de control.",
    count: 4 // Ketoprofeno, Fentanilo, Diclofenaco, Morfina
  },
  {
    category: "Cardiovascular e Inotrópicos",
    description: "Soporte cardíaco, control de arritmias, vasodilatadores coronarios e inotrópicos de terapia crítica.",
    count: 4 // Adenosina, Digoxina, Nitroglicerina, Dobutamina
  },
  {
    category: "Anticoagulantes y Hemostáticos",
    description: "Prevención o control de hemorragias y formación de trombos; profilaxis tromboembólica.",
    count: 3 // Ácido Tranexámico, Clopidogrel, Heparina Sódica
  },
  {
    category: "Anticonvulsionantes y Antiepilépticos",
    description: "Control de crisis convulsivas, episodios maníacos de trastorno bipolar y estatus epiléptico.",
    count: 2 // Ácido Valproico, Fenitoína
  },
  {
    category: "Gastrointestinales y Antieméticos",
    description: "Tratamiento de reflujo, úlceras por estrés, motilidad digestiva y control de náuseas o vómitos severos.",
    count: 4 // Ondansetrón, Ranitidina, Pantoprazol, Metoclopramida
  },
  {
    category: "Hormonas y Obstetricia",
    description: "Medicación uterotónica para la inducción del parto, maduración cervical y manejo de fístulas digestivas.",
    count: 3 // Oxitocina, Misoprostol, Somatostatina
  },
  {
    category: "Fluidos, Electrolitos y Nutrición",
    description: "Soluciones hipertónicas, alcalinizantes urinarios, diuréticos osmóticos y nutrición calórica crítica.",
    count: 4 // Manitol, Bicarbonato Sódico, Sulfato de Magnesio, Glucosa Hipertónica
  },
  {
    category: "Psicofármacos",
    description: "Antipsicóticos y neurolépticos para el control de delirios agudos, esquizofrenia o agitación psicomotriz.",
    count: 1 // Haloperidol
  },
  {
    category: "Vitaminas y Otros",
    description: "Vitaminas hidrosolubles esenciales para deficiencias nutricionales graves, alcoholismo y desnutrición.",
    count: 1 // Tiamina (Vit. B1)
  }
];

const baseMedicines: Medicine[] = [
  {
    id: 1,
    fullName: "Ácido Tranexámico (Amchafibrin)",
    genericName: "Ácido Tranexámico",
    brandNames: ["Amchafibrin"],
    composition: "Ácido tranexámico (100 mg/ml).",
    indications: "Hemorragias graves, cirugías con alto riesgo de sangrado, hiperfibrinólisis.",
    contraindications: "Hipersensibilidad, tasis trombótica activa, antecedentes de trombosis venosa o arterial.",
    dosage: "IV: 10-15 mg/kg cada 8h. Ajustar en falla renal.",
    presentation: "Ampollas inyectables, comprimidos.",
    adverseReactions: "Hipotensión (si se inyecta rápido), náuseas, vómitos, visión borrosa.",
    warningsPrecautions: "Crítica: Riesgo de trombosis. Administrar en infusión lenta (mínimo 20-30 min).",
    category: "Anticoagulantes y Hemostáticos",
    isCritical: true
  },
  {
    id: 2,
    fullName: "Ácido Valproico (Depakene, Valcote)",
    genericName: "Ácido Valproico",
    brandNames: ["Depakene", "Valcote"],
    composition: "Valproato sódico / Ácido valproico.",
    indications: "Epilepsia (crisis generalizadas/focales), episodios maníacos en trastorno bipolar.",
    contraindications: "Hipersensibilidad, enfermedad hepática activa, porfiria hepática.",
    dosage: "VO/IV: 15-30 mg/kg/día dividido en 2-3 dosis.",
    presentation: "Ampollas inyectables, jarabe, tabletas.",
    adverseReactions: "Temblor, somnolencia, aumento de peso, trombocitopenia, náuseas.",
    warningsPrecautions: "Crítica: Teratógeno estricto. Monitorear función hepática y hemograma.",
    category: "Anticonvulsionantes y Antiepilépticos",
    isCritical: true
  },
  {
    id: 3,
    fullName: "Adenosina (Adenocor)",
    genericName: "Adenosina",
    brandNames: ["Adenocor"],
    composition: "Adenosina (3 mg/ml).",
    indications: "Conversión rápida a ritmo sinusal de taquicardias supraventriculares (TSVP).",
    contraindications: "Bloqueo AV de 2º o 3º grado (sin marcapasos), enfermedad del nodo sinusal, asma grave.",
    dosage: "IV rápida: 6 mg en bolo directo (3s); si no revierte, 12 mg a los 1-2 min.",
    presentation: "Ampollas inyectables.",
    adverseReactions: "Flushing (sofoco), disnea, dolor torácico, asistolia transitoria.",
    warningsPrecautions: "Crítica: Administrar solo en bolo IV ultra rápido seguido de flush de solución salina.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: true
  },
  {
    id: 4,
    fullName: "Clopidogrel (Plavix)",
    genericName: "Clopidogrel",
    brandNames: ["Plavix"],
    composition: "Clopidogrel (75 mg).",
    indications: "Prevención de eventos aterotrombóticos (SCA, IAM, ACV, ICP).",
    contraindications: "Hipersensibilidad, sangrado patológico activo (úlcera péptica, hemorragia intracraneal).",
    dosage: "VO: Dosis de carga: 300-600 mg. Mantenimiento: 75 mg/día.",
    presentation: "Comprimidos.",
    adverseReactions: "Sangrado (epistaxis, GI), hematomas, dispepsia, dolor abdominal.",
    warningsPrecautions: "Suspender 5-7 días antes de cirugías programadas. Precaución con anticoagulantes.",
    category: "Anticoagulantes y Hemostáticos",
    isCritical: false
  },
  {
    id: 5,
    fullName: "Midazolam (Dormicum)",
    genericName: "Midazolam",
    brandNames: ["Dormicum"],
    composition: "Midazolam (1 o 5 mg/ml).",
    indications: "Sedación consciente, inducción anestésica, crisis convulsivas agudas.",
    contraindications: "Hipersensibilidad a benzodiacepinas, miastenia gravis, insuficiencia respiratoria grave.",
    dosage: "IV/IM: 0.05-0.1 mg/kg para sedación. Ajustar según respuesta.",
    presentation: "Ampollas inyectables, comprimidos.",
    adverseReactions: "Depresión respiratoria, hipotensión, sedación prolongada, agitación paradójica.",
    warningsPrecautions: "Crítica: Alto riesgo de paro respiratorio. Mantener soporte ventilatorio listo.",
    category: "Anestésicos y Sedantes",
    isCritical: true
  },
  {
    id: 6,
    fullName: "Ondansetrón (Zofran)",
    genericName: "Ondansetrón",
    brandNames: ["Zofran"],
    composition: "Ondansetrón (2 mg/ml).",
    indications: "Prevención y tratamiento de náuseas y vómitos postoperatorios o inducidos por quimio/radioterapia.",
    contraindications: "Hipersensibilidad, uso concomitante con apomorfina.",
    dosage: "IV/VO: 4-8 mg cada 8-12h según protocolo.",
    presentation: "Ampollas inyectables, comprimidos (comunes y dispersables).",
    adverseReactions: "Cefalea, estreñimiento, sensación de calor/sofoco, prolongación del intervalo QT.",
    warningsPrecautions: "Monitorear en pacientes con trastornos electrolíticos o riesgo de arritmias.",
    category: "Gastrointestinales y Antieméticos",
    isCritical: false
  },
  {
    id: 7,
    fullName: "Oxitocina (Syntocinon)",
    genericName: "Oxitocina",
    brandNames: ["Syntocinon"],
    composition: "Oxitocina sintética (5 o 10 UI/ml).",
    indications: "Inducción y conducción del parto, prevención y tratamiento de la atonía uterina postparto.",
    contraindications: "Desproporción cefalopélvica, sufrimiento fetal agudo, hipertonía uterina, placenta previa.",
    dosage: "IV (infusión): 1-2 mUI/min, aumentar gradualmente. Atonía: 10-40 UI en 1000 ml SF.",
    presentation: "Ampollas inyectables.",
    adverseReactions: "Hiperestimulación uterina, sufrimiento fetal, intoxicación por agua (dosis altas).",
    warningsPrecautions: "Crítica: Monitoreo estricto de la contractilidad uterina y FC fetal.",
    category: "Hormonas y Obstetricia",
    isCritical: true
  },
  {
    id: 8,
    fullName: "Ranitidina (Zantac)",
    genericName: "Ranitidina",
    brandNames: ["Zantac"],
    composition: "Ranitidina (25 mg/ml o 150/300 mg).",
    indications: "Úlcera gástrica/duodenal, reflujo gastroesofágico, profilaxis de úlcera por estrés.",
    contraindications: "Hipersensibilidad conocida a antagonistas H2.",
    dosage: "IV: 50 mg cada 6-8h. VO: 150-300 mg/día.",
    presentation: "Ampollas inyectables, comprimidos.",
    adverseReactions: "Cefalea, mareo, diarrea, raramente confusión (ancianos), elevación de transaminasas.",
    warningsPrecautions: "Ajustar dosis en insuficiencia renal severa. (Retirado en varios países por impurezas NDMA).",
    category: "Gastrointestinales y Antieméticos",
    isCritical: false
  },
  {
    id: 9,
    fullName: "Misoprostol (Cytotec)",
    genericName: "Misoprostol",
    brandNames: ["Cytotec"],
    composition: "Misoprostol (200 mcg).",
    indications: "Prevención de úlceras por AINEs, inducción del parto (maduración cervical), aborto médico.",
    contraindications: "Hipersensibilidad a prostaglandinas, embarazo (si se usa para úlceras).",
    dosage: "Obstétrica (Vaginal/Sublingual): 25-50 mcg para inducción; 400-800 mcg para hemorragia postparto.",
    presentation: "Comprimidos (orales / vaginales).",
    adverseReactions: "Cólicos uterinos, diarrea, dolor abdominal, fiebre, escalofríos.",
    warningsPrecautions: "Crítica: Riesgo severo de ruptura uterina si se dosifica incorrectamente en obstetricia.",
    category: "Hormonas y Obstetricia",
    isCritical: true
  },
  {
    id: 10,
    fullName: "Somatostatina (Somatostatina Combino)",
    genericName: "Somatostatina",
    brandNames: ["Somatostatina Combino"],
    composition: "Somatostatina sintética (3 mg).",
    indications: "Hemorragia digestiva alta por varices esofágicas, fístulas pancreáticas.",
    contraindications: "Hipersensibilidad, embarazo, lactancia.",
    dosage: "IV: Bolo inicial de 250 mcg seguido de infusión continua de 250 mcg/h.",
    presentation: "Vial liofilizado con disolvente.",
    adverseReactions: "Náuseas, rubor, bradicardia, hiper/hipoglucemia transitoria.",
    warningsPrecautions: "Requiere control glucémico estrecho (inhibe la insulina y el glucagón).",
    category: "Hormonas y Obstetricia",
    isCritical: false
  },
  {
    id: 11,
    fullName: "Tiamina (Vit. B1) (Benerva)",
    genericName: "Tiamina (Vit. B1)",
    brandNames: ["Benerva"],
    composition: "Clorhidrato de tiamina (100 mg/ml).",
    indications: "Beriberi, encefalopatía de Wernicke, psicosis de Korsakoff, alcoholismo crónico.",
    contraindications: "Hipersensibilidad a la tiamina.",
    dosage: "IV/IM: 100-500 mg cada 8h in Wernicke. Administrar antes que la glucosa.",
    presentation: "Ampollas inyectables, comprimidos.",
    adverseReactions: "Reacciones de hipersensibilidad (raro shock anafiláctico en administración IV rápida).",
    warningsPrecautions: "Administrar de forma lenta si es IV. Crucial en pacientes desnutridos antes de aportar carga de carbohidratos.",
    category: "Vitaminas y Otros",
    isCritical: false
  },
  {
    id: 12,
    fullName: "Digoxina (Lanoxin)",
    genericName: "Digoxina",
    brandNames: ["Lanoxin"],
    composition: "Digoxina (0.25 mg/ml o 0.25 mg).",
    indications: "Insuficiencia cardíaca congestiva, control de frecuencia en fibrilación auricular.",
    contraindications: "Bloqueo AV de 2º o 3º grado, miocardiopatía hipertrófica obstructiva, síndrome de WPW.",
    dosage: "IV/VO: Carga (digitalización): 0.5-1 mg dividido. Mantenimiento: 0.125-0.25 mg/día.",
    presentation: "Ampollas inyectables, comprimidos, elíxir.",
    adverseReactions: "Náuseas, vómitos, visión cromática (amarillo-verde), arritmias, bradicardia.",
    warningsPrecautions: "Crítica: Estrecho margen terapéutico. El riesgo de toxicidad aumenta con la hipopotasemia.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: true
  },
  {
    id: 13,
    fullName: "Fenitoína (Epamin, Dilantin)",
    genericName: "Fenitoína",
    brandNames: ["Epamin", "Dilantin"],
    composition: "Fenitoína sódica (50 mg/ml).",
    indications: "Status epilepticus, crisis convulsivas tónico-clónicas generalizadas y focales.",
    contraindications: "Hipersensibilidad a hidantoínas, bradicardia sinusal, bloqueo sinoatrial o AV de 2º/3º grado.",
    dosage: "IV (Urgencia): 15-20 mg/kg a velocidad máxima de 50 mg/min.",
    presentation: "Ampollas inyectables, cápsulas, suspensión.",
    adverseReactions: "Nistagmo, ataxia, hiperplasia gingival (uso crónico), hipotensión y arritmias (IV rápido).",
    warningsPrecautions: "Crítica: No diluir en soluciones glucosadas (precipita). Pasar lento y monitorear ECG.",
    category: "Anticonvulsionantes y Antiepilépticos",
    isCritical: true
  },
  {
    id: 14,
    fullName: "Manitol (Manitol 20%)",
    genericName: "Manitol",
    brandNames: ["Manitol 20%"],
    composition: "Manitol al 10% o 20% (solución hipertónica).",
    indications: "Reducción de la presión intracraneal elevada (edema cerebral) y de la presión intraocular.",
    contraindications: "Anuria por daño renal grave, insuficiencia cardíaca congestiva grave, deshidratación severa.",
    dosage: "IV (Infusión): 0.25 a 2 g/kg administrados en un periodo de 30-60 minutos.",
    presentation: "Solución para infusión endovenosa.",
    adverseReactions: "Desequilibrio electrolítico, deshidratación, expansión del volumen extracelular, cefalea.",
    warningsPrecautions: "Crítica: Usar filtro de línea. Puede cristalizar a bajas temperaturas. Evaluar osmolaridad plasmática.",
    category: "Fluidos, Electrolitos y Nutrición",
    isCritical: true
  },
  {
    id: 15,
    fullName: "Heparina Sódica (Heparina Sódica)",
    genericName: "Heparina Sódica",
    brandNames: ["Heparina Sódica"],
    composition: "Heparina sódica (1000 UI/ml o 5000 UI/ml).",
    indications: "Profilaxis y tratamiento de la enfermedad tromboembólica venosa y embolia pulmonar.",
    contraindications: "Sangrado activo significativo, trombocitopenia inducida por heparina (TIH) previa, trastornos de la coagulación.",
    dosage: "IV: Bolo de 5000 UI, seguido de infusión continua de 15-18 UI/kg/h (ajustar según TTPa).",
    presentation: "Viales inyectables.",
    adverseReactions: "Hemorragias, trombocitopenia (TIH), osteoporosis (uso prolongado), hematoma local.",
    warningsPrecautions: "Controlar estrictamente el TTPa. El antídoto en caso de sobredosis es el Sulfato de Protamina.",
    category: "Anticoagulantes y Hemostáticos",
    isCritical: false
  },
  {
    id: 16,
    fullName: "Ketoprofeno (Profenid)",
    genericName: "Ketoprofeno",
    brandNames: ["Profenid"],
    composition: "Ketoprofeno (50 mg/ml o 100 mg).",
    indications: "Dolor agudo moderado a intenso, inflamación, afecciones reumatológicas.",
    contraindications: "Hipersensibilidad a AINEs o aspirina, úlcera péptica activa, insuficiencia renal/hepática grave.",
    dosage: "IV/IM: 100 mg cada 8-12h (máximo 200 mg/día). VO: 50-100 mg cada 8h.",
    presentation: "Ampollas inyectables, cápsulas, tabletas.",
    adverseReactions: "Dispepsia, dolor gastroesofágico, sangrado GI, disfunción renal, cefalea.",
    warningsPrecautions: "Precaución en hipertensos y cardiópatas (retención de líquidos). Usar la dosis mínima eficaz.",
    category: "Analgésicos y Opioides",
    isCritical: false
  },
  {
    id: 17,
    fullName: "Bicarbonato Sódico (Bicarbonato de Sodio 8.4%)",
    genericName: "Bicarbonato Sódico",
    brandNames: ["Bicarbonato de Sodio 8.4%"],
    composition: "Bicarbonato de sodio (1 mEq/ml en sol. al 8.4%).",
    indications: "Acidosis metabólica severa, hiperpotasemia grave, parada cardíaca prolongada, alcalinización urinaria.",
    contraindications: "Alcalosis metabólica o respiratoria, hipocalcemia, hipopotasemia extrema, hipernatremia.",
    dosage: "IV: Según déficit de bases: mEq=0.3×kg×Déficit de HCO3. Pasar lento.",
    presentation: "Ampollas / Frascos para infusión.",
    adverseReactions: "Alcalosis, hipopotasemia, hipernatremia, sobrecarga de volumen, tetania por hipocalcemia.",
    warningsPrecautions: "Crítica: Es una solución hiperosmolar. No mezclar con calcio en la misma vía (precipita).",
    category: "Fluidos, Electrolitos y Nutrición",
    isCritical: true
  },
  {
    id: 18,
    fullName: "Nitroglicerina (Solinitrina)",
    genericName: "Nitroglicerina",
    brandNames: ["Solinitrina"],
    composition: "Nitroglicerina (1 o 5 mg/ml).",
    indications: "Angina de pecho inestable, IAM, insuficiencia cardíaca aguda, crisis hipertensiva.",
    contraindications: "Hipersensibilidad a nitratos, hipotensión grave, shock cardiogénico, uso concomitante de sildenafilo.",
    dosage: "IV (Infusión): Iniciar a 5-10 mcg/min e incrementar según respuesta hemodinámica.",
    presentation: "Ampollas inyectables, parches, spray sublingual.",
    adverseReactions: "Cefalea pulsátil, hipotensión ortostática, taquicardia refleja, rubor.",
    warningsPrecautions: "Requiere envases de vidrio o sistemas de infusión especiales no absorbentes (no PVC).",
    category: "Cardiovascular e Inotrópicos",
    isCritical: false
  },
  {
    id: 19,
    fullName: "Propofol (Diprivan)",
    genericName: "Propofol",
    brandNames: ["Diprivan"],
    composition: "Propofol (10 mg/ml [1%] o 20 mg/ml [2%]).",
    indications: "Inducción y mantenimiento de la anestesia general, sedación en UCI para ventilación mecánica.",
    contraindications: "Hipersensibilidad al propofol, soja o huevo; inestabilidad hemodinámica grave.",
    dosage: "IV: Inducción: 1.5-2.5 mg/kg. Mantenimiento: 4-12 mg/kg/h o sedación en UCI: 0.3-4 mg/kg/h.",
    presentation: "Emulsión inyectable (frasco / ampolla).",
    adverseReactions: "Hipotensión, bradicardia, depresión respiratoria/apnea, dolor en el sitio de inyección.",
    warningsPrecautions: "Crítica: Síndrome de infusión de propofol (dosis altas/prolongadas). Estricta técnica aséptica.",
    category: "Anestésicos y Sedantes",
    isCritical: true
  },
  {
    id: 20,
    fullName: "Rocuronio (Esmeron)",
    genericName: "Rocuronio",
    brandNames: ["Esmeron"],
    composition: "Bromuro de rocuronio (10 mg/ml).",
    indications: "Coadyuvante de la anestesia general para facilitar la intubación endotraqueal y relajación muscular.",
    contraindications: "Hipersensibilidad al rocuronio o al ion bromuro.",
    dosage: "IV: Intubación convencional: 0.6 mg/kg. Secuencia rápida: 0.9-1.2 mg/kg.",
    presentation: "Viales inyectables.",
    adverseReactions: "Prolongación del bloqueo neuromuscular, anafilaxia (raro), hipotensión.",
    warningsPrecautions: "Crítica: Paraliza los músculos respiratorios. Usar únicamente bajo ventilación asistida. Antídoto: Sugammadex.",
    category: "Anestésicos y Sedantes",
    isCritical: true
  },
  {
    id: 21,
    fullName: "Sulfato de Magnesio (Sulfato de Magnesio 15-25%)",
    genericName: "Sulfato de Magnesio",
    brandNames: ["Sulfato de Magnesio 15-25%"],
    composition: "Sulfato de magnesio heptahidratado.",
    indications: "Prevención y tratamiento de convulsiones en eclampsia/preeclampsia, torsión de puntas, hipomagnesemia.",
    contraindications: "Bloqueo cardíaco, daño miocárdico, insuficiencia renal grave.",
    dosage: "Eclampsia (IV): 4 g en 15-20 min, seguido de infusión de 1-2 g/h.",
    presentation: "Ampollas inyectables.",
    adverseReactions: "Pérdida de reflejos rotulianos, sofocos, hipotensión, bradicardia, depresión respiratoria.",
    warningsPrecautions: "Crítica: Monitorear reflejo patelar, diuresis y FR. El antídoto es el Gluconato de Calcio.",
    category: "Fluidos, Electrolitos y Nutrición",
    isCritical: true
  },
  {
    id: 22,
    fullName: "Haloperidol (Haldol)",
    genericName: "Haloperidol",
    brandNames: ["Haldol"],
    composition: "Haloperidol (5 mg/ml).",
    indications: "Esquizofrenia, psicosis agudas, delirio agudo (delirium), agitación psicomotriz.",
    contraindications: "Estado de coma, depresión severa del SNC, enfermedad de Parkinson, prolongación del QT.",
    dosage: "IV/IM: 2.5-10 mg en agitación aguda. Se puede repetir según necesidad clínica.",
    presentation: "Ampollas inyectables, comprimidos, gotas orales.",
    adverseReactions: "Síntomas extrapiramidales (distonía, acatisia), prolongación del intervalo QT, sedación.",
    warningsPrecautions: "Monitorizar ECG por riesgo de Torsión de Puntas. Riesgo de Síndrome Neuroléptico Maligno.",
    category: "Psicofármacos",
    isCritical: false
  },
  {
    id: 23,
    fullName: "Fentanilo (Fentanyl, Durogesic)",
    genericName: "Fentanilo",
    brandNames: ["Fentanyl", "Durogesic"],
    composition: "Citrato de fentanilo (0.05 mg/ml). Patches: 12, 25, 50, 75, 100 μg/h",
    indications: "Anestesia y mantenimiento, analgesia postoperatoria inmediata, dolor crónico intenso.",
    contraindications: "Hipersensibilidad a opioides, depresión respiratoria grave, uso de inhibidores de la MAO.",
    dosage: "IV: 2 a 5 mcg/kg. Transdérmica: 1 parche cada 72h. Individualizar dosis.",
    presentation: "Ampollas inyectables, parches transdérmicos, comprimidos sublinguales.",
    adverseReactions: "Somnolencia, náuseas, miosis, rigidez muscular (tórax de madera), depresión respiratoria.",
    warningsPrecautions: "Crítica: Alto potencial de adicción. La depresión respiratoria es dosis-dependiente y mortal. Solo uso hospitalario o supervisado.",
    category: "Analgésicos y Opioides",
    isCritical: true
  },
  {
    id: 24,
    fullName: "Diclofenaco (Voltarén, Cataflam)",
    genericName: "Diclofenaco",
    brandNames: ["Voltarén", "Cataflam"],
    composition: "Diclofenaco sódico o potásico (25 mg/ml o 50/75 mg).",
    indications: "Tratamiento del dolor agudo (cólico renal, osteoarticular, postoperatorio) e inflamación.",
    contraindications: "Úlcera péptica activa, insuficiencia cardíaca grave, disfunción renal severa, tercer trimestre de embarazo.",
    dosage: "IM profunda: 75 mg una o dos veces al día. VO: 50 mg cada 8-12h.",
    presentation: "Ampollas inyectables, comprimidos, supositorios, geles tópicos.",
    adverseReactions: "Dolor epigástrico, náuseas, sangrado digestivo, elevación de enzimas hepáticas.",
    warningsPrecautions: "No administrar vía IV directa (debe diluirse e infundirse si la presentación lo avala).",
    category: "Analgésicos y Opioides",
    isCritical: false
  },
  {
    id: 25,
    fullName: "Glucosa Hipertónica (Dextrosa 10%, 33%, 50%)",
    genericName: "Glucosa Hipertónica",
    brandNames: ["Dextrosa 10%", "Dextrosa 33%", "Dextrosa 50%"],
    composition: "Glucosa anhidra en concentraciones mayores al 5%.",
    indications: "Tratamiento de la hipoglucemia grave, aporte calórico en nutrición parenteral.",
    contraindications: "Hiperglucemia, diabetes descompensada, coma hiperosmolar, hipopotasemia sin corrección.",
    dosage: "IV: Variable según requerimiento y nivel de glucemia (ej. 10-25 g de glucosa en bolo lento).",
    presentation: "Ampollas inyectables (33%), frascos para infusión (10%, 50%).",
    adverseReactions: "Hiperglucemia, glucosuria, tromboflebitis (si se pasa por vía periférica las concentraciones altas).",
    warningsPrecautions: "Crítica: Las soluciones >10% idealmente deben infundirse por vía central por su alta osmolaridad. Administrar de forma lenta.",
    category: "Fluidos, Electrolitos y Nutrición",
    isCritical: true
  },
  {
    id: 26,
    fullName: "Dobutamina (Dobutrex)",
    genericName: "Dobutamina",
    brandNames: ["Dobutrex"],
    composition: "Clorhidrato de dobutamina (12.5 mg/ml).",
    indications: "Soporte inotrópico en insuficiencia cardíaca aguda, shock cardiogénico o tras cirugía cardíaca.",
    contraindications: "Estenosis subaórtica hipertrófica idiopática, hipersensibilidad a la dobutamina.",
    dosage: "IV (Infusión): 2.5 a 20 mcg/kg/min ajustando según respuesta hemodinámica.",
    presentation: "Ampollas / Viales para infusión.",
    adverseReactions: "Taquicardia, fluctuaciones de la PA, extrasístoles ventriculares, dolor anginoso.",
    warningsPrecautions: "Corregir la hipovolemia antes de iniciar el tratamiento. Monitoreo continuo de ECG y PA.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: false
  },
  {
    id: 27,
    fullName: "Ketamina (Ketolar)",
    genericName: "Ketamina",
    brandNames: ["Ketolar"],
    composition: "Clorhidrato de ketamina (50 mg/ml).",
    indications: "Inducción y mantenimiento de la anestesia, sedación profunda, analgesia subanestésica.",
    contraindications: "Pacientes en los que un aumento de la PA sea un riesgo grave (preeclampsia, HTA severa).",
    dosage: "IV: Inducción: 1-2 mg/kg. Sedación/Analgesia: 0.2-0.5 mg/kg.",
    presentation: "Viales inyectables.",
    adverseReactions: "Reacciones de emergencia (alucinaciones, delirio), hipertensión, taquicardia, sialorrea.",
    warningsPrecautions: "Produce anestesia disociativa. Asociar con benzodiacepinas minimiza las reacciones psíquicas del despertar.",
    category: "Anestésicos y Sedantes",
    isCritical: false
  },
  {
    id: 28,
    fullName: "Pantoprazol (Pantozol)",
    genericName: "Pantoprazol",
    brandNames: ["Pantozol"],
    composition: "Pantoprazol sódico (40 mg).",
    indications: "Úlcera péptica, esofagitis por reflujo, síndrome de Zollinger-Ellison, profilaxis de úlcera por estrés.",
    contraindications: "Hipersensibilidad al pantoprazol o a otros benzimidazoles sustituidos.",
    dosage: "IV/VO: 40 mg una vez al día; puede aumentarse a 80 mg en patologías hipersecretoras.",
    presentation: "Vial liofilizado para solución inyectable, comprimidos.",
    adverseReactions: "Cefalea, diarrea, dolor abdominal, hipomagnesemia (en tratamientos muy prolongados).",
    warningsPrecautions: "La administración IV debe realizarse lentamente en un lapso de 2 a 15 minutos.",
    category: "Gastrointestinales y Antieméticos",
    isCritical: false
  },
  {
    id: 29,
    fullName: "Metoclopramida (Reliveran, Primperan)",
    genericName: "Metoclopramida",
    brandNames: ["Reliveran", "Primperan"],
    composition: "Clorhidrato de metoclopramida (5 mg/ml o 10 mg).",
    indications: "Náuseas y vómitos inducidos por quimioterapia o postoperatorios, gastroparesia diabética.",
    contraindications: "Hemorragia, obstrucción o perforación gastrointestinal, feocromocitoma, antecedentes de disquinesia.",
    dosage: "IV/IM/VO: 10 mg hasta 3 veces al día (máximo 30 mg/día).",
    presentation: "Ampollas inyectables, comprimidos, gotas orales.",
    adverseReactions: "Somnolencia, lasitud, reacciones extrapiramidales (especialmente en jóvenes/dosis altas).",
    warningsPrecautions: "Crítica: Administrar IV de forma muy lenta (mínimo 3 min) para evitar acatisia intensa y pánico.",
    category: "Gastrointestinales y Antieméticos",
    isCritical: true
  },
  {
    id: 30,
    fullName: "Morfina (Cloruro de Morfina)",
    genericName: "Morfina",
    brandNames: ["Cloruro de Morfina"],
    composition: "Cloruro o sulfato de morfina (10 o 20 mg/ml).",
    indications: "Dolor severo agudo o crónico, dolor oncológico, disnea asociada a insuficiencia ventricular izquierda.",
    contraindications: "Depresión respiratoria grave, traumatismo craneoencefálico (presión intracraneal elevada), íleo paralítico.",
    dosage: "IV/IM/SC: 2.5-10 mg cada 4h según titulación y requerimientos del paciente.",
    presentation: "Ampollas inyectables, comprimidos, solución oral.",
    adverseReactions: "Depresión respiratoria, estreñimiento, náuseas, sedación, miosis, hipotensión.",
    warningsPrecautions: "Crítica: Alto potencial de abuso y dependencia física. Mantener antagonista (Naloxona) disponible.",
    category: "Analgésicos y Opioides",
    isCritical: true
  },
  {
    id: 31,
    fullName: "Amlodipino (Norvasc)",
    genericName: "Amlodipino",
    brandNames: ["Norvasc", "Amloc"],
    composition: "Amlodipino besilato (5 mg o 10 mg).",
    indications: "Hipertensión arterial sistémica, angina de pecho estable crónica o vasoespástica (Prinzmetal).",
    contraindications: "Hipotensión grave, shock (incluyendo shock cardiogénico), insuficiencia cardíaca tras un infarto agudo de miocardio.",
    dosage: "VO: Inicialmente 5 mg una vez al día, ajustable según respuesta clínica hasta un máximo de 10 mg una vez al día.",
    presentation: "Comprimidos.",
    adverseReactions: "Edema de tobillos (periférico), cefalea, rubor facial (bochornos), palpitaciones, mareos.",
    warningsPrecautions: "Precaución en insuficiencia cardíaca descompensada y hepatopatías. Monitorear edemas y presión arterial.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: false
  },
  {
    id: 32,
    fullName: "Bisoprolol (Concor)",
    genericName: "Bisoprolol",
    brandNames: ["Concor", "Beloc"],
    composition: "Bisoprolol fumarato (1.25 mg, 2.5 mg, 5 mg o 10 mg).",
    indications: "Cardiopatía isquémica, hipertensión arterial, insuficiencia cardíaca crónica estable con disfunción ventricular izquierda sistólica.",
    contraindications: "Insuficiencia cardíaca aguda o episodios de descompensación (requiriendo inotrópicos), shock cardiogénico, bloqueo AV de 2º o 3º grado (sin marcapasos), bradicardia (<60 lpm), asma bronquial grave.",
    dosage: "VO: Inicialmente 1.25 mg una vez al día. Incrementar semanal o quincenalmente de forma gradual hasta un máximo de 10 mg una vez al día.",
    presentation: "Comprimidos.",
    adverseReactions: "Bradicardia sintomática, frialdad en extremidades, mareo, fatiga intensa, hipotensión excesiva.",
    warningsPrecautions: "Crítica: Nunca suspender de manera brusca el tratamiento por riesgo de inducción de taquiarritmias, crisis anginosas o infarto de miocardio.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: true
  },
  {
    id: 33,
    fullName: "Amiodarona (Atlansil, Cordarone)",
    genericName: "Amiodarona",
    brandNames: ["Atlansil", "Cordarone"],
    composition: "Clorhidrato de amiodarona (150 mg/3ml inyectable o 200 mg comprimido).",
    indications: "Tratamiento y prevención de arritmias ventriculares o supraventriculares recurrentes y graves (fibrilación o flutter auricular).",
    contraindications: "Bradicardia sinusal extrema, bloqueo SA o AV de 2º o 3º grado (sin marcapasos funcionante), disfunción tiroidea activa, lactancia.",
    dosage: "IV (Emergencia): Bolo inicial de 150-300 mg infundido en glucosa al 5%; mantenimiento por infusión continua. VO: 200-600 mg al día.",
    presentation: "Ampollas inyectables, comprimidos.",
    adverseReactions: "Toxicidad pulmonar (fibrosis alveolar), disfunción tiroidea (hipo o hipertiroidismo), microdepósitos corneales, fotosensibilidad cutánea, coloración azul-grisácea de la piel.",
    warningsPrecautions: "Crítica: Realizar controles periódicos de ECG, radiografía de tórax y pruebas de función tiroidea y hepática. Prolonga de forma dosis-dependiente el intervalo QT.",
    category: "Cardiovascular e Inotrópicos",
    isCritical: true
  }
];

export const medicines: Medicine[] = [
  ...baseMedicines,
  ...getAdditionalMedicines()
];

export const predefinedInteractions: DrugInteraction[] = [
  // Depresión respiratoria extrema potenciada (Opioides + Alucinógenos / Benzodiacepinas / Sedantes)
  {
    drug1Id: 5, // Midazolam
    drug2Id: 23, // Fentanilo
    severity: "Alta",
    mechanism: "Efecto sedante y depresor respiratorio sinérgico severo mediado por receptores GABA y opioides.",
    recommendation: "Evitar combinación a menos que sea bajo estricta supervisión anestésica. Reducir dosis al menos 50% y monitorear capnografía/oximetría."
  },
  {
    drug1Id: 5, // Midazolam
    drug2Id: 30, // Morfina
    severity: "Alta",
    mechanism: "Sinergia en la depresión del sistema nervioso central y del centro respiratorio bully de forma severa.",
    recommendation: "Reducir dosis de benzodiacepinas y opioides. Monitorizar continuamente funciones vitales."
  },
  // Antiepilépticos
  {
    drug1Id: 2, // Ácido Valproico
    drug2Id: 13, // Fenitoína
    severity: "Alta",
    mechanism: "El ácido valproico desplaza a la fenitoína de su unión a proteínas plasmáticas e inhibe su metabolismo hepático, pudiendo causar toxicidad aguda por fenitoína.",
    recommendation: "Monitorizar estrechamente niveles de fenitoína libre. Ajustar dosis según la clínica y hemogramas."
  },
  // Anticoagulantes
  {
    drug1Id: 15, // Heparina Sódica
    drug2Id: 4, // Clopidogrel
    severity: "Alta",
    mechanism: "Efecto anticoagulante y antiagregante plaquetario potenciado, aumentando drásticamente el riesgo de hemorragia grave activa.",
    recommendation: "Monitorear TTPa y signos de sangrado (melenas, hematuria, sangrado gingival). Usar con extrema precaución."
  },
  {
    drug1Id: 15, // Heparina Sódica
    drug2Id: 16, // Ketoprofeno
    severity: "Alta",
    mechanism: "Los AINEs inhiben la función plaquetaria y la agregación, además de aumentar el riesgo de erosión y sangrado gástrico.",
    recommendation: "Evitar concomitancia. Reemplazar AINE por paracetamol si es posible para analgesia simple."
  },
  {
    drug1Id: 15, // Heparina Sódica
    drug2Id: 24, // Diclofenaco
    severity: "Alta",
    mechanism: "Riesgo incrementado de sangrado gastrointestinal y sistémico por bloqueo de COX-1 plaquetario.",
    recommendation: "Evitar el uso conjunto. Monitorizar hemogramas si no es posible suspender."
  },
  // Digoxina
  {
    drug1Id: 12, // Digoxina
    drug2Id: 26, // Dobutamina
    severity: "Moderada",
    mechanism: "Efecto inotrópico aditivo que puede propiciar arritmias cardíacas graves (extrasístoles, fibrilación).",
    recommendation: "Realizar monitoreo electrocardiográfico estricto. Monitorear niveles séricos de potasio y digoxina."
  },
  {
    drug1Id: 12, // Digoxina
    drug2Id: 17, // Bicarbonato Sódico
    severity: "Alta",
    mechanism: "El bicarbonato de sodio desplaza el potasio intracelularmente causando hipopotasemia, lo que sensibiliza el miocardio a la toxicidad por digoxina.",
    recommendation: "Evitar corregir la acidosis con bicarbonato de manera rápida en pacientes digitalizados. Mantener niveles normales de potasio (K+)."
  },
  // Nitroglicerina + Sildenafilo (aunque no esté en la lista, podemos modelarlo con otros fármacos o representarlo adecuadamente si se consulta)
  // Tiamina + Glucosa alert
  {
    drug1Id: 11, // Tiamina
    drug2Id: 25, // Glucosa
    severity: "Moderada",
    mechanism: "La administración de cargas de carbohidratos/glucosa sin tiamina previa agota las reservas de esta última, desencadenando la encefalopatía aguda de Wernicke.",
    recommendation: "REGLA DE SEGURIDAD CRÍTICA: Administrar siempre la ampolla de Tiamina ANTES o simultáneamente con la infusión de Glucosa Hipertónica."
  },
  // Ketamina + Midazolam
  {
    drug1Id: 5, // Midazolam
    drug2Id: 27, // Ketamina
    severity: "Leve",
    mechanism: "Sinergia anestésica beneficiosa en muchos casos que atenúa los efectos psicomiméticos de la ketamina (delirio de despertar).",
    recommendation: "Sinergia terapéutica común. Permite reducir las dosis de ambos agentes. Vigilancia respiratoria estándar."
  },
  // Rocuronio + Sedantes
  {
    drug1Id: 19, // Propofol
    drug2Id: 20, // Rocuronio
    severity: "Moderada",
    mechanism: "Bloqueo neuromuscular facilitado y prolongado bajo inducción profunda de propofol.",
    recommendation: "Asegurar soporte de ventilación mecánica de alta prioridad. Reversión posterior segura si fuese necesario."
  },
  // Nuevas interacciones de medicamentos cardiovasculares agregados
  {
    drug1Id: 32, // Bisoprolol
    drug2Id: 33, // Amiodarona
    severity: "Alta",
    mechanism: "Sinergia depresora de los nódulo sinusal y auriculoventricular. Puede ocasionar bradicardia severa, bloqueo cardíaco completo o parada sinusal.",
    recommendation: "Evitarlos de forma libre. Si es clínicamente indispensable el uso conjunto, ajustar dosis a la baja, monitorizar con ECG y vigilar los pulsos."
  },
  {
    drug1Id: 31, // Amlodipino
    drug2Id: 32, // Bisoprolol
    severity: "Moderada",
    mechanism: "Efecto aditivo hipotensor y depresor cardíaco. Riesgo de hipotensión severa, bradicardia o síncope.",
    recommendation: "Monitorizar la presión arterial y el pulso basal durante el inicio y ajuste de dosis de ambos fármacos."
  },
  {
    drug1Id: 31, // Amlodipino
    drug2Id: 33, // Amiodarona
    severity: "Moderada",
    mechanism: "La amiodarona inhibe el aclaramiento hepático vía CYP3A4, pudiendo elevar las concentraciones séricas de amlodipino con riesgo de hipotensión grave y edema periférico.",
    recommendation: "Vigilar edemas marcados y respuesta de la tensión arterial. Considerar reducir dosis de amlodipino."
  }
];
