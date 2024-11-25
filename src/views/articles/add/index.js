// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";
import { useForm, Controller } from "react-hook-form";

import { postApi } from "../../../core/api/api";
import toast from "react-hot-toast";

// ** Reactstrap Imports

const colourOptions = [
  { value: "ocean", label: "اخبار پژوهشگاه" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
];

const ArticlesAdd = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm();

  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      Title: values.Title,
      GoogleTitle: values.GoogleTitle,
      GoogleDescribe: values.GoogleDescribe,
      MiniDescribe: values.MiniDescribe,
      Describe: values.Describe,
      Keyword: values.Keyword,
      NewsCatregoryId: "12",
    };
    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });


    const path = `/News/CreateNews`;
    const body = formData;
    const response = await postApi({ path, body });
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardHeader tag="h2">افزودن اخبار و مقاله جدید</CardHeader>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4} xs={12}>
              <Label className="form-label" for="Title">
               1
              </Label>
              <Controller
                control={control}
                name="Title"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="GoogleTitle">
               2
              </Label>
              <Controller
                control={control}
                name="GoogleTitle"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="GoogleDescribe">
               3
              </Label>
              <Controller
                control={control}
                name="GoogleDescribe"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="MiniDescribe">
               4
              </Label>
              <Controller
                control={control}
                name="MiniDescribe"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="Describe">
                5
              </Label>
              <Controller
                control={control}
                name="Describe"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="Keyword">
                6
              </Label>
              <Controller
                control={control}
                name="Keyword"
                render={({ field }) => (
                  <Input {...field} invalid={errors.firstName && true} />
                )}
              />
            </Col>

            <Col sm="12" className="mt-2">
              <div className="d-flex">
                <Button className="me-1 " color="primary" type="submit">
                  ثبت
                </Button>
                <Button outline color="secondary" type="reset">
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default ArticlesAdd;
