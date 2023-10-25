import React, { PureComponent,} from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "Group A", value: 0.7 },
  { name: "Group B", value: 1 - 0.7 },
];

const COLORS = [
  data[0].value >= 0.9
    ? "red"
    : data[0].value >= 0.5
    ? "yellow"
    : data[0].value >= 0.2
    ? "blue"
    : "green",
  "#FFFFFF",
];

export default class PieCharts extends PureComponent {
  state = {
    percentage: 0,
  };

  componentDidMount() {
    this.animatePercentage();
  }

  animatePercentage = () => {
    const { value } = data[0];
    const step = value / 100; // Calculate the step size
    let currentPercentage = 0;

    const interval = setInterval(() => {
      if (currentPercentage >= value) {
        clearInterval(interval);
      } else {
        currentPercentage += step;
        this.setState({ percentage: currentPercentage });
      }
    }, 20);
  };

  render() {
    return (
      <PieChart width={400} height={150}>
        <Pie
          data={data}
          cx={170}
          cy={70}
          innerRadius={40}
          outerRadius={60}
          startAngle={45}
          endAngle={405}
          fill="#FFFFFF"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value={`${Math.floor(this.state.percentage * 100)}%`}
            position="center"
            fill="black"
            fontSize={22}
            fontWeight={"bold"}
          />
        </Pie>
      </PieChart>
    );
  }
}
