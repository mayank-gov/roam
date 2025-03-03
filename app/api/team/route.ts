// app/api/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { TeamMember } from '@/lib/types';

// Helper function to read the JSON file
async function getTeamData() {
    const filePath = path.join(process.cwd(), 'data', 'team.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
}

// Helper function to write to the JSON file
async function saveTeamData(data: any) {
    const filePath = path.join(process.cwd(), 'data', 'team.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET: Fetch all team members
export async function GET() {
    try {
        const data = await getTeamData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 });
    }
}

// POST: Add a new team member
export async function POST(request: NextRequest) {
    try {
        const data = await getTeamData();
        const newMember = await request.json();

        // Generate a unique ID
        const id = (Math.max(0, ...data.teamMembers.map((member: TeamMember) => parseInt(member.id))) + 1).toString();

        // Set default onboarding status
        const memberWithDefaults: TeamMember = {
            ...newMember,
            id,
            onboardingStatus: {
                opsLoginCreated: false,
                assetsAssigned: false,
                accessCardSubmitted: false,
                developerAccessGranted: newMember.isDeveloper ? false : null
            }
        };

        data.teamMembers.push(memberWithDefaults);
        await saveTeamData(data);

        return NextResponse.json(memberWithDefaults, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
    }
}

// PUT: Update a team member (including onboarding status)
export async function PUT(request: NextRequest) {
    try {
        const data = await getTeamData();
        const updatedMember = await request.json() as TeamMember;

        const index = data.teamMembers.findIndex((member: TeamMember) => member.id === updatedMember.id);

        if (index === -1) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        data.teamMembers[index] = updatedMember;
        await saveTeamData(data);

        return NextResponse.json(updatedMember);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

// DELETE: Remove a team member
export async function DELETE(request: NextRequest) {
    try {
        const data = await getTeamData();
        const { id } = await request.json();

        const index = data.teamMembers.findIndex((member: TeamMember) => member.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        data.teamMembers.splice(index, 1);
        await saveTeamData(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}