import { PolarArea } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const ChartjsPolarAreaChart = ({ data, labelColor }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45,
      },
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 25,
          boxWidth: 9,
          color: labelColor,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            const percentage = tooltipItem.raw;
            let count = 0;

            switch (label) {
              case "کاربران فعال":
                count = data?.inCompeletUserCount || 0;
                break;
              case "کاربران نیمه‌فعال":
                count = data?.deactiveUsers || 0;
                break;
              case "رزروهای تایید شده":
                count = data?.allReserveAccept || 0;
                break;
              case "رزروهای تایید نشده":
                count = data?.allReserveNotAccept || 0;
                break;
              default:
                break;
            }

            return `${label}: ${percentage}% (${count} نفر)`;
          },
        },
      },
    },
  };

  const activeUserPercent = parseFloat(data?.activeUserPercent || 0);
  const inCompeletUserCount = parseInt(data?.inCompeletUserCount || 0);
  const interActiveUserPercent = 100 - activeUserPercent;
  const interActiveUserCount = parseInt(data?.deactiveUsers || 0);
  const reserveAcceptPercent = parseFloat(data?.reserveAcceptPercent || 0);
  const allReserveAccept = parseInt(data?.allReserveAccept || 0);
  const reserveNotAcceptPercent = parseFloat(
    data?.reserveNotAcceptPercent || 0
  );
  const allReserveNotAccept = parseInt(data?.allReserveNotAccept || 0);

  const chartData = {
    labels: [
      "کاربران فعال",
      "کاربران نیمه‌فعال",
      "رزروهای تایید شده",
      "رزروهای تایید نشده",
    ],
    datasets: [
      {
        borderWidth: 0,
        label: "Statistics",
        data: [
          activeUserPercent,
          interActiveUserPercent,
          reserveAcceptPercent,
          reserveNotAcceptPercent,
        ],
        backgroundColor: ["#007bff", "#ffe700", "#ffcc00", "#17a2b8"],
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">آمار کاربران و رزروها</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "350px" }}>
          <PolarArea data={chartData} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsPolarAreaChart;
