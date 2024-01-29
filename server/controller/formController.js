import userModel from "../models/userModel.js";

export async function uploadForm(req, res) {
    try {
        const { name, email, phone, batch, domain, place } = req.body

        const exists = await userModel.findOne({ email })
        if (exists) return res.json({ success: false, message: 'Student already exists' });
        const user = await userModel.create({ name, email, phone, batch, domain, place })

        return res.json({ success: true, message: 'Student Added' });

    } catch (error) {
        res.json({ success: false, message: 'Network error' })
        console.error(error)
    }
}


export async function getStudents(req, res) {
    try {
        const users = await userModel.find({})
        return res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: 'Network error' })
        console.error(error)
    }
}


export async function updateStudent(req, res) {
    try {

        const { _id } = req.params
        console.log(req.body,'dgdh');
        const user = await userModel.findByIdAndUpdate(_id, req.body)
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        return res.json({ success: true, message: 'Updated Successfully'  });

    } catch (error) {
        res.json({ success: false, message: 'Network error' })
        console.error(error)
    }
}

export async function deleteStudent(req, res) {
    try {

        const { _id } = req.params
        const user = await userModel.findByIdAndDelete(_id)
        return res.json({ success: true, message: 'Student deleted' });
    } catch (error) {
        res.json({ success: false, message: 'Network error' })
        console.error(error)
    }
}