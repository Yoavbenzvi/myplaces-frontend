import React, { useState,useContext } from "react";
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from '../../shared/components/UIElements/Modal';
import GoogleMaps from '../../shared/components/UIElements/GoogleMaps'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import "./PlaceItem.css";

const PlaceItem = (props) => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const openMapHandler = () => setShowMap(true);

	const closeMapHandler = () => setShowMap(false);

	const showDeleteWarningHandler = () => setShowConfirmModal(true);

	const cancelDeleteHandler = () => setShowConfirmModal(false);

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE');
			props.onDelete(props.id);
		} catch(err) {

		}
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal //map modal
				show={showMap} 
				onCancel={closeMapHandler} 
				header={props.address} 
				contentClass='place-item__modal-content' 
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className='map-container'>
					<GoogleMaps center={props.coordinates} zoom={16}/>
				</div>
			</Modal>
			<Modal //delete modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'  
				footerClass='plcae-item__modal-actions'
				footer={
					<React.Fragment>
						<Button 
							inverse 
							onClick={cancelDeleteHandler}
						>
							CANCEL
						</Button>
						<Button 
							danger 
							onClick={confirmDeleteHandler}
						>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>Do you want to delete this place? This action cannot be undone thereafter</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="place-item__image">
						<img src={props.image} alt={props.title} />
					</div>
					<div className="place-item__info">
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
						{auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button> }
						{auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> }
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
