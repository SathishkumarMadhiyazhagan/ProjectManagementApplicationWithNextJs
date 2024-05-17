import axios from "axios";

export async function getProjects() {
    try {
        const res = await fetch("/api/project", {
            cache:"no-store",
        })
        if(!res.ok) {
            throw new Error("Failed to fetch Projects");
        }
        return res.json();
    } catch(error) {
        console.log("Error loading users", error)
    }
};

export async function postProjects(projectid, projectname, startdate, enddate,
  projecttype, projectsbu, projectmanager, projectfile) {
    try {
        const res = await fetch("/api/project", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({projectid, projectname, startdate, enddate,
            projecttype, projectsbu, projectmanager, projectfile}),
        });
        console.log(res);
  
        // if (res.ok) {
          return res;
        // } else {
          // throw new Error("Failed to create a project");
        // }
      } catch (error) {
        console.log(error);
        return false;
      }
};

export async function fetchDetailsByIds(idsArray) {
  try {
    const response = await fetch('/api/project/projectId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: idsArray }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching details:', error);
    return [];
  }
}