import { BarChart, Grid } from 'react-native-svg-charts'

const GraphSVG = () => {
  const data = [ 50, 10, 40, 95, 85 ]

  return (
    <BarChart 
      style={{ height: 380 }} 
      data={data} 
      svg={{ fill: 'rgba(134, 65, 244, 0.8)' }} 
      contentInset={{ top: 30, bottom: 30 }}
    >
      <Grid />
    </BarChart>
  )
}

export default GraphSVG