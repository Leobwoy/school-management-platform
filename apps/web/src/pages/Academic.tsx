import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  Add,
  Search,
  Edit,
  Visibility,
  People,
} from '@mui/icons-material'

const courses = [
  {
    id: 'C001',
    name: 'Mathematics Grade 10',
    code: 'MATH10',
    credits: 4,
    department: 'Mathematics',
    students: 25,
  },
  {
    id: 'C002',
    name: 'Physics Grade 10',
    code: 'PHYS10',
    credits: 4,
    department: 'Science',
    students: 20,
  },
  {
    id: 'C003',
    name: 'English Grade 10',
    code: 'ENG10',
    credits: 3,
    department: 'English',
    students: 22,
  },
]

const schedules = [
  {
    course: 'Mathematics Grade 10',
    day: 'Monday',
    time: '09:00-10:00',
    room: 'R101',
    teacher: 'Dr. Smith',
  },
  {
    course: 'Physics Grade 10',
    day: 'Tuesday',
    time: '10:00-11:00',
    room: 'Lab1',
    teacher: 'Dr. Johnson',
  },
  {
    course: 'English Grade 10',
    day: 'Wednesday',
    time: '11:00-12:00',
    room: 'R205',
    teacher: 'Ms. Williams',
  },
]

export default function Academic() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Academic Management System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage courses, schedules, and academic operations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
        >
          Add Course
        </Button>
      </Box>

      {/* Integration Panel */}
      <Card sx={{ mb: 3, bgcolor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Module Integrations
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Chip label="SIS - Student Enrollment" color="primary" size="small" />
            </Grid>
            <Grid item>
              <Chip label="HRM - Teacher Assignment" color="secondary" size="small" />
            </Grid>
            <Grid item>
              <Chip label="RMS - Resource Allocation" color="default" size="small" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Courses" />
          <Tab label="Schedules" />
          <Tab label="Grades" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Courses Grid */}
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} md={6} lg={4} key={course.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {course.name}
                      </Typography>
                      <Box>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Code: {course.code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Credits: {course.credits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Department: {course.department}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <People fontSize="small" color="action" />
                      <Typography variant="body2">
                        {course.students} students
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{schedule.course}</TableCell>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.room}</TableCell>
                    <TableCell>{schedule.teacher}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Grade Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Grade management functionality would be implemented here with integration to student records and assessment systems.
          </Typography>
        </Box>
      )}
    </Box>
  )
}
