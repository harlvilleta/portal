import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Avatar, Chip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import UserSidebar from "./components/UserSidebar";
import Overview from "./pages/Overview";
import Students from "./pages/Students";
import Activity from "./pages/Activity";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ViolationRecord from "./pages/ViolationRecord";
import ViolationCreateMeeting from "./pages/ViolationCreateMeeting";
import ViolationHistory from "./pages/ViolationHistory";
import ViolationStatus from "./pages/ViolationStatus";
import Options from "./pages/Options";
import Announcements from "./pages/Announcements";
import RecycleBin from "./pages/RecycleBin";
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import AnnouncementReport from "./pages/AnnouncementReport";
import UserViolations from "./pages/UserViolations";
import UserAnnouncements from "./pages/UserAnnouncements";
import UserLostFound from "./pages/UserLostFound";
import UserNotifications from "./pages/UserNotifications";

// Header component for admin dashboard
function AdminHeader({ currentUser, userProfile }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayInfo = () => {
    if (userProfile) {
      return {
        name: userProfile.fullName || currentUser?.displayName || 'Admin User',
        email: userProfile.email || currentUser?.email,
        photo: userProfile.profilePic || currentUser?.photoURL,
        role: userProfile.role || 'Admin'
      };
    }
    return {
      name: currentUser?.displayName || 'Admin User',
      email: currentUser?.email,
      photo: currentUser?.photoURL,
      role: 'Admin'
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', color: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flex: 0.5 }}></Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1976d2', flex: 1, textAlign: 'center', ml: -2 }}>
          School Management System
        </Typography>
        <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={userInfo.role} 
              size="small" 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {userInfo.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                  src={userInfo.photo} 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: userInfo.photo ? 'transparent' : '#1976d2'
                  }}
                >
                  {!userInfo.photo && (userInfo.name?.charAt(0) || userInfo.email?.charAt(0))}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2">{userInfo.email}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Header component for user dashboard
function UserHeader({ currentUser, userProfile }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayInfo = () => {
    if (userProfile) {
      return {
        name: userProfile.fullName || currentUser?.displayName || 'Student',
        email: userProfile.email || currentUser?.email,
        photo: userProfile.profilePic || currentUser?.photoURL,
        role: userProfile.role || 'Student'
      };
    }
    return {
      name: currentUser?.displayName || 'Student',
      email: currentUser?.email,
      photo: currentUser?.photoURL,
      role: 'Student'
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', color: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flex: 0.5 }}></Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1976d2', flex: 1, textAlign: 'center', ml: -2 }}>
          School Management System
        </Typography>
        <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={userInfo.role} 
              size="small" 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {userInfo.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                  src={userInfo.photo} 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: userInfo.photo ? 'transparent' : '#1976d2'
                  }}
                >
                  {!userInfo.photo && (userInfo.name?.charAt(0) || userInfo.email?.charAt(0))}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2">{userInfo.email}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    console.log('App component mounted, starting auth check...');
    
    // Add a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('Loading timeout reached, forcing app to load');
      setLoading(false);
      if (!userRole && user) {
        console.log('No role set but user exists, defaulting to Student');
        setUserRole('Student'); // Default fallback
      }
    }, 5000); // Increased to 5 second timeout

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      
      if (user) {
        console.log('Setting user state...');
        setUser(user);
        setCurrentUser(user);
        setLoading(true);
        
        try {
          console.log('Fetching user document from Firestore...');
          // Fetch user profile and role with timeout
          const userDoc = await Promise.race([
            getDoc(doc(db, 'users', user.uid)),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
          ]);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data found:', userData);
            setUserProfile(userData);
            setUserRole(userData.role || 'Student');
            console.log('User profile and role loaded:', userData.role);
          } else {
            // If no user document exists, create one with default role
            console.log('No user document found, creating default user document');
            const defaultUserData = {
              email: user.email,
              fullName: user.displayName || user.email,
              role: 'Student',
              createdAt: new Date().toISOString(),
              uid: user.uid
            };
            
            try {
              await setDoc(doc(db, 'users', user.uid), defaultUserData);
              setUserProfile(defaultUserData);
              setUserRole('Student');
              console.log('Default user document created with Student role');
            } catch (createError) {
              console.error('Error creating user document:', createError);
              setUserRole('Student');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // On error, default to Student to prevent login loops
          setUserRole('Student');
          console.log('Error occurred, defaulting to Student role');
        }
        
        clearTimeout(loadingTimeout);
        setLoading(false);
        console.log('Authentication process completed');
      } else {
        console.log('User logged out, clearing state...');
        // User logged out
        setUser(null);
        setCurrentUser(null);
        setUserProfile(null);
        setUserRole(null);
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  console.log('Current state:', { user: !!user, userRole, loading, userEmail: user?.email });

  // Show loading while checking authentication
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Please wait while we set up your dashboard</div>
        <Button 
          variant="outlined" 
          onClick={() => {
            console.log('Manual loading override');
            setLoading(false);
            if (!userRole && user) {
              console.log('Setting default role to Student');
              setUserRole('Student');
            }
          }}
          sx={{ mt: 2 }}
        >
          Continue to App
        </Button>
      </Box>
    );
  }

  // If user is not authenticated, show login
  if (!user) {
    console.log('No user detected, showing login page');
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  console.log('User authenticated, role:', userRole, 'Rendering dashboard...');
  console.log('User details:', { email: user.email, displayName: user.displayName, uid: user.uid });

  // If user is authenticated but role is not determined yet, show loading
  if (!userRole) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>Setting up your dashboard...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Please wait a moment</div>
        <Button 
          variant="contained" 
          onClick={() => {
            console.log('Force setting role to Student');
            setUserRole('Student');
          }}
          sx={{ mt: 2 }}
        >
          Continue as Student
        </Button>
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin/Teacher Routes - Only accessible to Admin/Teacher roles */}
        <Route path="/*" element={
          (userRole === 'Admin' || userRole === 'Teacher') ? (
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "#f5f6fa" }}>
              <AdminHeader currentUser={currentUser} userProfile={userProfile} />
              <Box sx={{ display: "flex", flex: 1 }}>
                <Sidebar />
                <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/overview" />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/students/*" element={<Students />} />
                    <Route path="/activity/*" element={<Activity />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/violation-record" element={<ViolationRecord />} />
                    <Route path="/violation-record/create-meeting" element={<ViolationCreateMeeting />} />
                    <Route path="/violation-record/history" element={<ViolationHistory />} />
                    <Route path="/violation-record/status" element={<ViolationStatus />} />
                    <Route path="/options" element={<Options />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/announcements/report" element={<AnnouncementReport />} />
                    <Route path="/recycle-bin" element={<RecycleBin />} />
                    <Route path="/user/*" element={<Navigate to="/overview" />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          ) : userRole === 'Student' ? (
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "#f5f6fa" }}>
              <UserHeader currentUser={currentUser} userProfile={userProfile} />
              <Box sx={{ display: "flex", flex: 1 }}>
                <UserSidebar />
                <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
                  <Routes>
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/violations" element={<UserViolations currentUser={currentUser} />} />
                    <Route path="/announcements" element={<UserAnnouncements />} />
                    <Route path="/lost-found" element={<UserLostFound currentUser={currentUser} />} />
                    <Route path="/notifications" element={<UserNotifications currentUser={currentUser} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          ) : (
            // This should not happen since we check for userRole above, but just in case
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
              <div style={{ fontSize: '18px', marginBottom: '10px' }}>Setting up your account...</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Please wait a moment</div>
              <Button 
                variant="contained" 
                onClick={() => {
                  console.log('Force setting role to Student');
                  setUserRole('Student');
                }}
                sx={{ mt: 2 }}
              >
                Continue as Student
              </Button>
            </Box>
          )
        } />
      </Routes>
    </Router>
  );
}

export default App; 