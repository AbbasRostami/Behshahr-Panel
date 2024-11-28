import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, DownloadCloud, X } from "react-feather";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { postApi } from "../../../core/api/api";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const StepFour = ({ stepper, allData, cidHander }) => {
  const { handleSubmit } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  const { cID, setCID } = cidHander;
  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      ...allData,
      ...values,
      ImageAddress: files.length > 0 ? files[0] : null,
    };

    console.log("Step Four: ", datas);

    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });

    const path = `/Course`;
    const body = formData;
    const response = await postApi({ path, body });
    if (response.data.id) {
      stepper.next();
      setCID(response.data.id);
      toast.success("عکس با موفقیت باگذاری شد.");
    }

    const { id } = response.data;
    console.log("ID received:", id);
    console.log("Response Put: ", response);
  };

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => Object.assign(file)),
      ]);
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
        console.log("Selected Image:", acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    if (files.length > 0) {
      console.log("Latest file uploaded:", files[0]);
    } else {
      console.log("No files uploaded yet.");
    }
  }, [files]);

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex bg-white mt-1 align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-3">
          <CardHeader>
            <CardTitle tag="h4">Single</CardTitle>
          </CardHeader>
          <CardBody>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className="text-secondary">
                  Drop files here or click{" "}
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    browse
                  </a>{" "}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <ListGroup className="my-2">{fileList}</ListGroup>
                <div className="d-flex justify-content-end">
                  <Button
                    className="me-1"
                    color="danger"
                    outline
                    onClick={handleRemoveAllFiles}
                  >
                    حذف همه
                  </Button>
                </div>
              </Fragment>
            ) : null}
          </CardBody>
        </Card>

        <div className="d-flex justify-content-between mt-1">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              بازگشت
            </span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعدی
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default StepFour;
