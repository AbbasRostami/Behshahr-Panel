import { Fragment, useState } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  FormFeedback,
  ModalBody,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import "@styles/react/libs/react-select/_react-select.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { usePostSth } from "../../../core/apiPost";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useQueryClient } from "@tanstack/react-query";
const MySwal = withReactContent(Swal);
const BuildingAdd = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState([36.5565, 53.129]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = usePostSth("/Building");
  const queryClient = useQueryClient();
  const addNewBuilding = (data) => {
    const buildingData = {
      ...data,
      latitude: position[0].toFixed(6),
      longitude: position[1].toFixed(6),
    };

    console.log("اطلاعات ارسال شده:", buildingData);

    mutate(buildingData, {
      onSuccess: (response) => {
        console.log("ثبت ساختمان موفقیت‌آمیز بود:", response);

        queryClient.invalidateQueries(["/Building"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "ساختمان جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت ساختمان:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت ساختمان جدید رخ داد. لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "تلاش مجدد",
          customClass: {
            confirmButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
      },
    });
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <Fragment>
      <Card className="mb-0 r-2">
        <Button color="primary" onClick={() => setShow(true)}>
          افزدون ساختمان جدید
        </Button>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">اطلاعات ساختمان جدید را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addNewBuilding)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="buildingName">
                نام ساختمان
              </Label>
              <Controller
                control={control}
                name="buildingName"
                rules={{
                  required: "وارد کردن نام ساختمان الزامی است.",
                  minLength: {
                    value: 5,
                    message: "تعداد کاراکترهای نام ساختمان باید حداقل 5 باشد.",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "تعداد کاراکترهای نام ساختمان باید حداکثر 50 باشد.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="buildingName"
                    placeholder="نام ساختمان"
                    invalid={errors.buildingName && true}
                  />
                )}
              />
              {errors.buildingName && (
                <FormFeedback>{errors.buildingName.message}</FormFeedback>
              )}
            </Col>
            <Col xs={6}>
              <Label className="form-label" for="workDate">
                تاریخ
              </Label>
              <Controller
                name="workDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="workDate" />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="workDescribe">
                مساحت ساختمان
              </Label>
              <Controller
                name="workDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="workDescribe"
                    placeholder="مساحت تقریبی"
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="floor">
                طبقه
              </Label>
              <Controller
                name="floor"
                control={control}
                rules={{
                  required: "وارد کردن طبقه الزامی است.",
                  validate: (value) =>
                    (value >= 1 && value <= 254) ||
                    "عدد باید بین 1 تا 254 باشد.",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    id="floor"
                    placeholder="طبقه ساختمان"
                    invalid={errors.floor && true}
                  />
                )}
              />
              {errors.floor && (
                <FormFeedback>{errors.floor.message}</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="mt-2">
              <Label className="form-label" for="map">
                مکان ساختمان (روی نقشه کلیک کنید)
              </Label>
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ثبت
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow(false)}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default BuildingAdd;
