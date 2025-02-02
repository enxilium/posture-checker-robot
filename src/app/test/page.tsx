"use client";

import { useState, useEffect } from "react";

export default function ApiTestScreen() {
    // States for registration
    const [regEmail, setRegEmail] = useState("");
    const [regName, setRegName] = useState("");
    const [registerResponse, setRegisterResponse] = useState<any>(null);

    // States for login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginResponse, setLoginResponse] = useState<any>(null);

    // States for creating a posture record
    const [prUserId, setPrUserId] = useState("");
    const [prEndTime, setPrEndTime] = useState("");
    const [prScore, setPrScore] = useState("");
    const [prResponse, setPrResponse] = useState<any>(null);

    // States for fetching single user info
    const [queryUserId, setQueryUserId] = useState("");
    const [userData, setUserData] = useState<any>(null);

    // State for all seeded data
    const [allUsers, setAllUsers] = useState<any[]>([]);

    // Fetch all seeded data on page load
    useEffect(() => {
        fetchAllUsers();
    }, []);

    async function fetchAllUsers() {
        try {
            const res = await fetch("/api/all-users");
            const data = await res.json();
            setAllUsers(data);
        } catch (error) {
            console.error("Error fetching all users:", error);
        }
    }

    async function handleRegister() {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: regEmail, name: regName }),
            });
            const data = await res.json();
            setRegisterResponse(data);
            await fetchAllUsers();
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    async function handleLogin() {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail }),
            });
            const data = await res.json();
            setLoginResponse(data);
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    async function handleCreatePostureRecord() {
        try {
            const res = await fetch("/api/posture-records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: prUserId,
                    endTime: prEndTime,
                    score: Number(prScore),
                }),
            });
            const data = await res.json();
            setPrResponse(data);
            await fetchAllUsers();
        } catch (error) {
            console.error("Error creating posture record:", error);
        }
    }

    async function handleQueryUser() {
        try {
            const res = await fetch(`/api/user-data?userId=${queryUserId}`);
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h1>API Testing Screen</h1>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Register User</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                {registerResponse && (
                    <pre>{JSON.stringify(registerResponse, null, 2)}</pre>
                )}
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Login User</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {loginResponse && (
                    <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
                )}
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Create Posture Record</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={prUserId}
                    onChange={(e) => setPrUserId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="End Time (ISO Format)"
                    value={prEndTime}
                    onChange={(e) => setPrEndTime(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={prScore}
                    onChange={(e) => setPrScore(e.target.value)}
                />
                <button onClick={handleCreatePostureRecord}>Create Record</button>
                {prResponse && <pre>{JSON.stringify(prResponse, null, 2)}</pre>}
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Get User Data</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={queryUserId}
                    onChange={(e) => setQueryUserId(e.target.value)}
                />
                <button onClick={handleQueryUser}>Get User</button>
                {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>All Seeded Data</h2>
                <button onClick={fetchAllUsers}>Refresh Data</button>
                <table border={1} cellPadding={4} cellSpacing={0} style={{ marginTop: "1rem" }}>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Posture Records</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name || "-"}</td>
                                <td>
                                    {user.postureRecords && user.postureRecords.length ? (
                                        <table border={1} cellPadding={2} cellSpacing={0}>
                                            <thead>
                                                <tr>
                                                    <th>Record ID</th>
                                                    <th>Score</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Created At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.postureRecords.map((record: any) => (
                                                    <tr key={record.id}>
                                                        <td>{record.id}</td>
                                                        <td>{record.score}</td>
                                                        <td>{new Date(record.startTime).toLocaleString()}</td>
                                                        <td>{new Date(record.endTime).toLocaleString()}</td>
                                                        <td>{new Date(record.createdAt).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        "No records"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}