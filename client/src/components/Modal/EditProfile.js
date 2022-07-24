import { Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useQuery, useMutation } from 'react-query'
import { API } from '../../config/api'

export default function EditProfile({ editShow, setEditShow }) {

    let navigate = useNavigate();

    const [preview, setPreview] = useState(null); //For image preview
    const [profile, setProfile] = useState({}); //Store profile data
    const [form, setForm] = useState({
        image: '',
        phone: '',
        gender: '',
        address: '',
    }); //Store profile data


    // Fetching detail profile data by id from database
    let { data: profiles, refetch } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
    });

    useEffect(() => {
        if (profiles) {
            setPreview(profiles.image);
            setForm({
                ...form,
                name: profiles.users.name,
                phone: profiles.phone,
                gender: profiles.gender,
                address: profiles.address,
            });
            setProfile(profiles);
        }
    }, [profiles]);

    // Handle change data on form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            // Store data with FormData as object
            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('name', form.name);
            formData.set('phone', form.phone);
            formData.set('gender', form.gender);
            formData.set('address', form.address);

            // Insert profile data
            const response = await API.patch('/profile', formData, config);

            console.log(response.data);

            setEditShow(false)
            navigate('/user/profile');
            refetch();
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <Modal show={editShow} onHide={() => setEditShow(false)} centered>
            <Modal.Body className="text-dark">
                <h3 className="sentenceHead" style={{ textAlign: "left", fontWeight: "bold" }}>
                    Edit Profile
                </h3>
                <div className="mt-2">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        {preview && (
                            <div>
                                <img
                                    src={preview}
                                    style={{
                                        maxWidth: '150px',
                                        maxHeight: '150px',
                                        objectFit: 'cover',
                                    }}
                                    alt="preview"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            id="upload"
                            name="image"
                            hidden
                            onChange={handleChange}
                        />
                        <label for="upload" className="label-file-add-book">
                            Upload File
                        </label>
                        <div className="mt-3 form">
                            <input
                                type="text"
                                placeholder="Name"
                                value={form?.name}
                                name="name"
                                onChange={handleChange}
                                className="px-3 py-2 mt-3"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={form?.phone}
                                name="phone"
                                onChange={handleChange}
                                className="px-3 py-2 mt-3"
                            />
                            <Form.Select aria-label="Default select example" onChange={handleChange} value={form?.gender} name="gender" className="px-3 py-2 mt-3">
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Control as="textarea" rows={3} onChange={handleChange} value={form?.address} name="address" placeholder="Address" className='px-3 py-2 mt-3'></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btnLogin">Save</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
