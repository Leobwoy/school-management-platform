import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material'
import {
  People,
  School,
  Assessment,
  TrendingUp,
  Notifications,
  Schedule,
} from '@mui/icons-material'

const stats = [
  { title: 'Total Students', value: '1,234', icon: <People />, color: 'primary' },
  { title: 'Active Teachers', value: '89', icon: <School />, color: 'secondary' },
  { title: 'Courses', value: '45', icon: <Assessment />, color: 'success' },
  { title: 'Attendance Rate', value: '94%', icon: <TrendingUp />, color: 'info' },
]

const recentActivities = [
  { text: 'New student enrollment: John Doe', time: '2 hours ago' },
  { text: 'Grade submitted for Mathematics', time: '4 hours ago' },
  { text: 'Parent meeting scheduled', time: '6 hours ago' },
  { text: 'Fee payment received', time: '1 day ago' },
]

const announcements = [
  { title: 'School Holiday', content: 'School will be closed on Monday for public holiday', priority: 'high' },
  { title: 'Parent-Teacher Meeting', content: 'Scheduled for next Friday at 2 PM', priority: 'medium' },
  { title: 'Exam Schedule', content: 'Mid-term exams start next week', priority: 'high' },
]

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome to the School Management System
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Announcements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Announcements
            </Typography>
            <List>
              {announcements.map((announcement, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <Schedule color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {announcement.title}
                        <Chip
                          label={announcement.priority}
                          size="small"
                          color={announcement.priority === 'high' ? 'error' : 'default'}
                        />
                      </Box>
                    }
                    secondary={announcement.content}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
