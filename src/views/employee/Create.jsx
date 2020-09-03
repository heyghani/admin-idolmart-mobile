import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import swal from "sweetalert";

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			location: "",
		};
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { name, location } = this.state;

		const body = JSON.stringify({ name, location });

		fetch("http://localhost:5000/api/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body,
		})
			.then((response) => response.json())
			.then((result) => {
				swal({
					title: "Berhasil!",
					text: "Data telah ditambah!",
					icon: "success",
					button: "OK",
				});

				this.props.history.push("/app/employee");
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { name, location } = this.state;
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--5" fluid>
					<Row>
						<Col className="order-xl-1" xl="12">
							<Card className="bg-secondary shadow">
								<CardHeader className="bg-white border-0">
									<Row className="align-items-center">
										<Col>
											<h3 className="mb-0">Tambah Employee</h3>
										</Col>
									</Row>
								</CardHeader>

								<CardBody>
									<Form role="form" onSubmit={this.onSubmit}>
										<div className="pl-lg-4">
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-name"
														>
															Nama
														</label>
														<Input
															className="form-control-alternative"
															value={name}
															onChange={(event) =>
																this.setState({
																	name: event.target.value,
																})
															}
															type="text"
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-location"
														>
															Location
														</label>
														<Input
															className="form-control-alternative"
															value={location}
															onChange={(event) =>
																this.setState({
																	location: event.target.value,
																})
															}
															type="textarea"
														/>
													</FormGroup>
												</Col>
											</Row>

											<Row>
												<Col lg="6" className="text-center">
													<FormGroup>
														<Button
															color="danger"
															onClick={() =>
																this.props.history.push("/app/employee")
															}
														>
															Batal
														</Button>
														<Button color="success" type="submit">
															Save
														</Button>
													</FormGroup>
												</Col>
											</Row>
										</div>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default CreateProduct;
