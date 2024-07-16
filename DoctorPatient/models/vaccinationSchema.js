import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vaccinationSchema = new Schema({
    childName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    timeOfBirth: {
        type: String,
        required: true,
    },
    vaccines: {
        hepatitisB: {
            birth: { type: Date },
            month1_2: { type: Date },
            month6_18: { type: Date },
        },
        rotavirus: {
            month2: { type: Date },
            month4: { type: Date },
            month6: { type: Date },
        },
        DTaP: {
            month2: { type: Date },
            month4: { type: Date },
            month6: { type: Date },
            month15_18: { type: Date },
            year4_6: { type: Date },
        },
        Hib: {
            month2: { type: Date },
            month4: { type: Date },
            month6: { type: Date },
            month12_15: { type: Date },
        },
        PCV13: {
            month2: { type: Date },
            month4: { type: Date },
            month6: { type: Date },
            month12_15: { type: Date },
        },
        IPV: {
            month2: { type: Date },
            month4: { type: Date },
            month6_18: { type: Date },
            year4_6: { type: Date },
        },
        influenza: {
            annually: [{ type: Date }],
        },
        MMR: {
            month12_15: { type: Date },
            year4_6: { type: Date },
        },
        varicella: {
            month12_15: { type: Date },
            year4_6: { type: Date },
        },
        hepatitisA: {
            month12_23_first: { type: Date },
            month12_23_second: { type: Date },
        },
        meningococcal: {
            highRisk: [{ type: Date }],
        },
        HPV: {
            year11_12_first: { type: Date },
            year11_12_second: { type: Date },
        },
        covid19: {
            firstDose: { type: Date },
            secondDose: { type: Date },
            booster: { type: Date },
        },
    },
}, { timestamps: true });

export default mongoose.model('Vaccination', vaccinationSchema);
