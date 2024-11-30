import { Bar } from 'react-chartjs-2'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ChartjsBarChart = ({ success, gridLineColor, labelColor, data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        min: 0,
        max: Math.max(
          parseInt(data?.allReserve || 0),
          parseInt(data?.allReserveAccept || 0),
          parseInt(data?.allReserveNotAccept || 0)
        ) + 50, 
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: {
          stepSize: 50,
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const chartData = {
    labels: [
      "مجموع رزروها",
      "مجموع رزروهای تایید شده",
      "مجموع رزروهای تایید نشده",
    ],
    datasets: [
      {
        maxBarThickness: 50,
        backgroundColor: ["#51e5a8", "#ffa800","#f64e60"], //
        borderColor: "transparent",
        borderRadius: { topRight: 8, topLeft: 8 },
        data: [
          parseInt(data?.allReserve || 0), //
          parseInt(data?.allReserveAccept || 0), 
          parseInt(data?.allReserveNotAccept || 0), 
        ],
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">دوره‌ها براساس رزرو</CardTitle>
        <div className="d-flex align-items-center">
          <Calendar size={14} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: "range",
              defaultDate: [
                new Date(),
                new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
              ],
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsBarChart;
