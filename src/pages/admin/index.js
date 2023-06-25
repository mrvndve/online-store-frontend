import { 
  Card, 
  LineChart, 
  VerticalLineChart,
  TextField,
  SelectField,
  DateField,
} from '../../components';

import { Box } from '@mui/material';

import { BrandingWatermark, Category, Inventory, People, ShoppingBag, TagSharp } from '@mui/icons-material';

import useAdminDashboard from '../../hooks/use-admin-dashboard';
import { SECONDARY_COLOR, numbersOnlyKeyPress } from '../../utils';

const ChartContainer = ({
  title,
  children,
}) => (
  <Card
    elevation={5}
    padding={15}
  >
    <div className='mb-3' align='center'>
      <span style={{
        fontWeight: 'bold',
        fontSize: 18,
      }}>
        {title}
      </span>
    </div>

    {children}
  </Card>
);

const CountCard = ({
  icon,
  title,
  count,
  backgroundColor,
}) => (
  <Card padding={30} sx={{ backgroundColor }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ alignSelf: 'flex-end' }}>
        {icon}
      </div>

      <div align='right' style={{ color: 'white' }}>
        <h1>
          <strong>
            {count}
          </strong>

          <br/>
        </h1>

        <h3>
          <span style={{ fontStyle: 'italic', opacity: 0.5 }}>
            {title}
          </span>
        </h3>
      </div>
    </Box>
  </Card>
);

const AdminDashboardPage = () => {
  const { 
    response,

    monthlySales,
    monthlySalesMonthValue,
    monthlySalesYearValue,
    onMonthlySalesMonthChange,
    onMonthlySalesYearChange,

    dailySales,
    dailySalesDateValue,
    onDailySalesDateChange,

    yearlySales,
    yearlySalesYearValue,
    onYearlySalesYearChange,
  } = useAdminDashboard();

  const IconStyle = { 
    fontSize: 100, color: 'white', 
    opacity: 0.5 
  };

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  return <>
    <div className='mb-5 row g-5'>
      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <People style={IconStyle}/>,
          title: 'Users', 
          count: response?.usersCount,
          backgroundColor: 'success.main'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <ShoppingBag style={IconStyle}/>,
          title: 'Products', 
          count: response?.productsCount,
          backgroundColor: 'warning.light'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <Category style={IconStyle}/>,
          title: 'Categories', 
          count: response?.categoriesCount,
          backgroundColor: 'secondary.main'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <BrandingWatermark style={IconStyle}/>,
          title: 'Brands', 
          count: response?.brandsCount,
          backgroundColor: 'error.main'
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <CountCard {...{
          icon: <TagSharp style={IconStyle}/>,
          title: 'Tags', 
          count: response?.tagsCount,
          backgroundColor: 'tertiary.main'
        }}/>
      </div>
    </div>

    <div className='row g-5'>
      <div className='col-6'>
        <ChartContainer title='Daily Sales'>
          <div className='mb-4'>
            <div className='d-flex justify-content-between gap-2'>
              <DateField
                label='Date'
                value={dailySalesDateValue}
                onChange={(e) => onDailySalesDateChange(e.target.value)}
              />
            </div>
          </div>

          <LineChart {...{
            data: dailySales,
            lines: [{
              name: 'amount',
              dataKey: 'amount',
              stroke: SECONDARY_COLOR.bgColor,
            }],
            xAxis: 'date',
          }}/>
        </ChartContainer>
      </div>

      <div className='col-6'>
        <ChartContainer title='Monthly Sales'>
          <div className='mb-4'>
            <div className='d-flex justify-content-between gap-2'>
              <SelectField
                label='Month'
                options={months.map(({ label, value}) => ({
                  label,
                  value,
                }))}
                value={monthlySalesMonthValue}
                onChange={(e) => onMonthlySalesMonthChange(e.target.value)}
              />

              <TextField
                label='Year'
                value={monthlySalesYearValue}
                onKeyPress={numbersOnlyKeyPress}
                onChange={(e) => onMonthlySalesYearChange(e.target.value)}
              />
            </div>
          </div>

          <LineChart {...{
            data: monthlySales,
            lines: [{
              name: 'amount',
              dataKey: 'amount',
              stroke: SECONDARY_COLOR.bgColor,
            }],
            xAxis: 'date',
          }}/>
        </ChartContainer>
      </div>

      <div className='col-6'>
        <ChartContainer title='Yearly Sales'>
          <div className='mb-4'>
            <div className='d-flex justify-content-between gap-2'>
              <TextField
                label='Date'
                value={yearlySalesYearValue}
                onKeyPress={numbersOnlyKeyPress}
                onChange={(e) => onYearlySalesYearChange(e.target.value)}
              />
            </div>
          </div>

          <LineChart {...{
            data: yearlySales,
            lines: [{
              name: 'amount',
              dataKey: 'amount',
              stroke: SECONDARY_COLOR.bgColor,
            }],
            xAxis: 'date',
          }}/>
        </ChartContainer>
      </div>
    </div>
  </>
};

export default AdminDashboardPage;