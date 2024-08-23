import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { User } from "../@types/User";


type PropTypes = {
  selectedUser: User | null;
};

function Modal({ selectedUser }: PropTypes) {
  const [show, setShow] = useState(!!selectedUser);

  useEffect(() => {
    setShow(!!selectedUser);
  }, [selectedUser]);

  const handleClose = () => setShow(false);

  return (
    <BootstrapModal show={show} onHide={handleClose} animation={false}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title className="text-black">
          User Info
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="text-black">
          <b>name:</b> {selectedUser?.name}
        </p>
        <p className="text-black">
          <b>email:</b> {selectedUser?.email}
        </p>
        <p className="text-black">
          <b>phone:</b> {selectedUser?.phone}
        </p>
        <p className="text-black">
          <b>website:</b> {selectedUser?.website}
        </p>
        <p className="text-black">
          <b>city:</b> {selectedUser?.address.city}
        </p>
        <p className="text-black">
          <b>street:</b> {selectedUser?.address.street}
        </p>
        <p className="text-black">
          <b>suite:</b> {selectedUser?.address.suite}
        </p>
        <p className="text-black">
          <b>zipcode:</b> {selectedUser?.address.zipcode}
        </p>
        <p className="text-black">
          <b>lat:</b> {selectedUser?.address.geo.lat}
        </p>
        <p className="text-black">
          <b>lng:</b> {selectedUser?.address.geo.lng}
        </p>
        <p className="text-black">
          <b>name:</b> {selectedUser?.company.name}
        </p>
        <p className="text-black">
          <b>catchPhrase:</b> {selectedUser?.company.catchPhrase}
        </p>
        <p className="text-black">
          <b>bs:</b> {selectedUser?.company.bs}
        </p>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default Modal;
