import React from "react";
import {
	Card,
	CardHeader,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Table,
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import swal from "sweetalert";

class Listslider extends React.Component {
	state = {
		data: [],
		limit: 0,
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		fetch("http://localhost:5000/api/view")
			.then((response) => response.json())
			.then((result) => {
				this.setState({ data: result.response });
			})
			.catch((err) => console.log(err));
	};

	handleDelete = (id) => {
		fetch(`http://localhost:5000/api/delete/${id}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				swal({
					title: "Berhasil!",
					text: "Data telah dihapus!",
					icon: "success",
					button: "OK",
				});
				this.getData();
				this.props.history.push("/app/employee");
			})
			.catch((err) => console.log(err));
	};

	onClickAdd = () => {
		this.props.history.push("/app/employee/create");
	};

	onClickDelete = (id) => {
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.handleDelete(id);
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	};

	render() {
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					{/* Table */}
					<Row>
						<div className="col">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row>
										<Col xl="6">
											<h3>Data Employee</h3>
										</Col>
										<Col sm={{ size: 1, offset: 5 }}>
											<Button
												className="float-left"
												color="primary"
												onClick={this.onClickAdd}
											>
												<i className="fas fa-plus" />
											</Button>
										</Col>
									</Row>
								</CardHeader>

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Nama</th>
											<th scope="col">Lokasi</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{this.state.data &&
											this.state.data.map((data) => {
												return (
													<tr key={data.id}>
														<th scope="row">
															<span className="mb-0 text-sm">{data.name}</span>
														</th>
														<th>{data.location}</th>

														<td className="text-center">
															<UncontrolledDropdown>
																<DropdownToggle
																	className="btn-icon-only text-light"
																	href="#pablo"
																	role="button"
																	size="sm"
																	color=""
																	onClick={(e) => e.preventDefault()}
																>
																	<i className="fas fa-ellipsis-v" />
																</DropdownToggle>
																<DropdownMenu
																	className="dropdown-menu-arrow"
																	right
																>
																	<DropdownItem
																		onClick={() =>
																			this.props.history.push(
																				`/app/employee/edit/${data.id}`
																			)
																		}
																	>
																		<i
																			className="fas fa-pencil-alt"
																			style={{ color: "orange" }}
																		/>
																		Edit
																	</DropdownItem>
																	<DropdownItem
																		onClick={() => this.onClickDelete(data.id)}
																	>
																		<i
																			className="fas fa-trash-alt"
																			style={{ color: "red" }}
																		/>
																		Delete
																	</DropdownItem>
																</DropdownMenu>
															</UncontrolledDropdown>
														</td>
													</tr>
												);
											})}
									</tbody>
								</Table>
							</Card>
						</div>
					</Row>
				</Container>
			</>
		);
	}
}

export default Listslider;
