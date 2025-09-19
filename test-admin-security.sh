#!/bin/bash

echo "🔍 Testing Admin Panel Security"
echo "================================"

# Start backend server if not running
if ! curl -s http://localhost:3001/api/products > /dev/null 2>&1; then
    echo "🚀 Starting backend server..."
    cd server && npm start &
    sleep 3
fi

# Test 1: Direct access to /admin without token
echo "\n📋 Test 1: Direct access to /admin without authentication"
echo "Expected: Should redirect to /admin-login"

# Open browser to test
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000/admin
elif command -v open > /dev/null; then
    open http://localhost:3000/admin
fi

echo "\n📋 Test 2: Check if localStorage has adminToken"
echo "Open browser console and run: localStorage.getItem('adminToken')"
echo "Expected: Should return null"

echo "\n📋 Test 3: Check network requests"
echo "1. Open browser DevTools (F12)"
echo "2. Go to Network tab"
echo "3. Refresh /admin page"
echo "Expected: Should see redirect to /admin-login"

echo "\n📋 Test 4: Test with invalid token"
echo "In browser console run:"
echo "localStorage.setItem('adminToken', 'invalid-token')"
echo "Then refresh the page"
echo "Expected: Should clear token and redirect to login"

echo "\n📋 Test 5: Verify backend authentication"
echo "Run: curl -X POST http://localhost:3001/api/verify-auth -H 'Authorization: Bearer invalid-token'"
echo "Expected: Should return 403 error"

echo "\n✅ Security tests completed. Check the browser behavior against expected results."