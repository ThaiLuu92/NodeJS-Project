import React, { useState, useEffect } from 'react';
import SlideBar from '../../Components/SlideBar/SlideBar'
import { Box, Card, CardContent, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import NavBar from '../../Components/NavBar/NavBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import Title from './Title';
import { I_Course, I_Category, I_Lesson, I_User, I_PaymentView} from "../../types/form.type";
import { Link as RouterLink } from 'react-router-dom';
import { getData } from '../../apis/API';
import BasicPie from './BasicPie';
import BasicLineChart from './LineChart';


function Home() {
  const [userData, setUserData] = useState<I_User[]>([]);
  const [courseData, setCourseData] = useState<I_Course[]>([]);
  const [lessonData, setLessonData] = useState<I_Lesson[]>([]);
  const [orderData, setOrderData] = useState<I_PaymentView[]>([]);
  const [catagoryData, setCatagoryData] = useState<I_Category[]>([]);
  useEffect(() => {
    fetchUsers();
    fetchOders();
    fetchCatagorys();
    fetchCourses();
    fetchLessons();
  }, []);

  async function fetchUsers() {
    const getUser = await getData("users");
    setUserData(getUser);

  }

async function fetchOders() {
    const getOder = await getData("payment")
    setOrderData(getOder.data)
}

async function fetchCatagorys() {
  const getCatagory = await getData("category");
  setCatagoryData(getCatagory);
}

async function fetchLessons() {
  const getLessions = await getData("lesson");
  setLessonData(getLessions);
}

async function fetchCourses() {
  const getCourse = await getData("course");
  setCourseData(getCourse);
}

  // Tính toán tổng users, japaneseCourses, lessons và doanh thu
  const totalUsers = userData.length;
  const totalJapaneseCourses = courseData.length;
  const totalLessons = lessonData.length;
  const totalCategory = catagoryData.length;
  const totalOrder = orderData.length;
  const totalRevenue = orderData.reduce((total, order) => {
    return total + order.course_price;
  }, 0);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>

        <SlideBar />
       

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <Grid container spacing={2}>
        
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title>Biểu đồ số khóa học bán theo ngày</Title>
                  <BasicLineChart/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title>Phần trăm danh mục đã bán theo tổng số khóa học bán ra</Title>
                  <BasicPie/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title> Tổng Số Học Viên</Title>
                  <Typography component="p" variant="h4">
                    {totalUsers}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/userManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Danh mục</Title>
                  <Typography component="p" variant="h4">
                    {totalCategory}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/catagoryManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Khóa Học</Title>
                  <Typography component="p" variant="h4">
                    {totalJapaneseCourses}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/coursesManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Bài Học</Title>
                  <Typography component="p" variant="h4">
                    {totalLessons}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/courseLessonManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          
            
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Số Khóa học đã bán</Title>
                  <Typography component="p" variant="h4">
                    {totalOrder}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/oderManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardContent>
                  <Title>Tổng Doanh thu</Title>
                  <Typography component="p" variant="h4">
                    {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('vi-VN')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/oderManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
     
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Home

