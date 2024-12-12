export interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  start_date: string;
  end_date: string;
  initiator: {
    firstname: string;
    lastname: string;
    email: string;
    nickname: string;
  };
  media: {
    file_path: string;
  }
  analytics:{
    total_founded: number;
  }
}
