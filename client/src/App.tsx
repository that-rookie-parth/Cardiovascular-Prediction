import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { BACKEND_URI } from "./constants";

interface FormFields {
    height: number;
    sbp: number;
    dbp: number;
    cholestrol: number;
    active: number;
    age: number;
    pulse: number;
}

function App() {
    const emptyForm: FormFields = {
        height: 0,
        sbp: 0,
        dbp: 0,
        cholestrol: 0,
        active: 0,
        age: 0,
        pulse: 0,
    };

    const [form, setForm] = useState<FormFields>(emptyForm);

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post(`${BACKEND_URI}/predict`, form)
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container id="app" className="p-3">
            <Row>
                <h1 className="text-center">Cardiovascular-Prediction</h1>
            </Row>
            <hr />
            <Form onSubmit={handleOnSubmit}>
                <FloatingLabel label={"Height"}>
                    <Form.Control
                        type="number"
                        value={form.height}
                        id="height"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Sbp"}>
                    <Form.Control
                        type="number"
                        value={form.sbp}
                        id="sbp"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Dbp"}>
                    <Form.Control
                        type="number"
                        value={form.dbp}
                        id="dbp"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Cholestrol"}>
                    <Form.Control
                        type="number"
                        value={form.cholestrol}
                        id="cholestrol"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Active"}>
                    <Form.Control
                        type="number"
                        value={form.active}
                        id="active"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Age"}>
                    <Form.Control
                        type="number"
                        value={form.age}
                        id="age"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <FloatingLabel label={"Pulse"}>
                    <Form.Control
                        type="number"
                        value={form.pulse}
                        id="pulse"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setForm((old) => {
                                return {
                                    ...old,
                                    [e.target.id]: e.target.value,
                                };
                            });
                        }}
                    ></Form.Control>
                </FloatingLabel>
                <Row>
                    <Button type="submit">Predict</Button>
                </Row>
            </Form>
        </Container>
    );
}

export default App;
