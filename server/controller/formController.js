import userModel from "../models/userModel";

export async function uploadForm(req, res) {
    try {

        const { name, email, phone, mobile, gender, batch, domain, place } = req.body

        const user = await userModel.create({name, email, phone, mobile, gender, batch, domain, place})

        return res.json({ success: true, user });

    } catch (error) {
        res.json({ status: false, message: 'Network error' })
        console.error(error)
    }
}


export async function getStudents(req, res) {
    try {
        const users = await userModel.find({})
        return res.json({ success: true, users });
    } catch (error) {
        res.json({ status: false, message: 'Network error' })
        console.error(error)
    }
}


export async function updateStudent(req, res) {
    try {

        const _id = req.params
        const user = await userModel.findByIdAndUpdate(_id,req.body,{new: true})
        if (!user) {
            return res.json({message:'User not found'});
          }
        return res.json({ success: true });

    } catch (error) {
        res.json({ status: false, message: 'Network error' })
        console.error(error)
    }
}

export async function deleteStudent(req, res) {
    try {

        const _id = req.params
        const user = await userModel.findByIdAndDelete(_id)
        return res.json({ success: true });
    } catch (error) {
        res.json({ status: false, message: 'Network error' })
        console.error(error)
    }
}