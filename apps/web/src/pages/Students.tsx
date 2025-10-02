import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'
import {
  Add,
  Search,
  Edit,
  Visibility,
  Delete,
} from '@mui/icons-material'

const students = [
  {
    id: 'S001',
    name: 'John Doe',
    email: 'john.doe@student.com',
    grade: '10',
    class: 'A',
    parent: 'Jane Doe',
    phone: '+1234567890',
    status: 'Active',
  },
  {
    id: 'S002',
    name: 'Alice Smith',
    email: 'alice.smith@student.com',
    grade: '9',
    class: 'B',
    parent: 'Bob Smith',
    phone: '+1234567891',
    status: 'Active',
  },
  {
    id: 'S003',
    name: 'Mike Johnson',
    email: 'mike.johnson@student.com',
    grade: '11',
    class: 'A',
    parent: 'Sarah Johnson',
    phone: '+1234567892',
    status: 'Inactive',
  },
]

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Student Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage student records and information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
        >
          Add Student
        </Button>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search students..."
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

      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.parent}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      color: student.status === 'Active' ? 'success.main' : 'error.main',
                      fontWeight: 'bold',
                    }}
                  >
                    {student.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" color="primary">
                {students.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Students
              </Typography>
              <Typography variant="h4" color="success.main">
                {students.filter(s => s.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Inactive Students
              </Typography>
              <Typography variant="h4" color="error.main">
                {students.filter(s => s.status === 'Inactive').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
