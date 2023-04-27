import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import {
    Alert,
    Button,
    Container,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
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
    const [processing, setProcessing] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageTypre] = useState<string>("danger");

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        axios
            .post(`${BACKEND_URI}/predict`, {
                ...form,
                pulse: form.sbp - form.dbp,
            })
            .then((resp) => {
                console.log(resp.data);
                const prediction = resp.data.prediction;
                if (prediction === "0") {
                    setMessage(
                        "Congratulations! According to our model, you don't have the disease 💗"
                    );
                    setMessageTypre("success");
                } else {
                    setMessage(
                        "Sorry to say it, but according to our model, you do have the disease 💀"
                    );
                    setMessageTypre("danger");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <Container id="app" className="p-3">
            <Row>
                <h1 className="text-center">Cardiovascular-Prediction</h1>
            </Row>
            <hr />
            {message.length > 0 && (
                <Row className="m-2">
                    <Alert
                        dismissible
                        show={message.length > 0}
                        onClose={() => setMessage("")}
                        variant={messageType}
                    >
                        {message}
                    </Alert>
                </Row>
            )}
            <Row className="m-2">
                <Form onSubmit={handleOnSubmit}>
                    <FloatingLabel className="my-2" label={"Height"}>
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
                    <FloatingLabel className="my-2" label={"Sbp"}>
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
                    <FloatingLabel className="my-2" label={"Dbp"}>
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
                    <FloatingLabel className="my-2" label={"Cholestrol"}>
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
                    <FloatingLabel className="my-2" label={"Active"}>
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
                    <FloatingLabel className="my-2" label={"Age"}>
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
                    <Row>
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </Spinner>
                            )}
                            {!processing && "Predict"}
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default App;
