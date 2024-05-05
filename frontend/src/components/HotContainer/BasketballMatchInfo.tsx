import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Basketball.css"

interface Match {
  team1Logo: string;
  team2Logo: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status: string;  // "未开始", "进行中", "已结束"
  matchTime:string;
}

const BasketballMatchInfo: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    //后端调用代码，暂时注释
    /*
    const fetchMatches = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_HERE');
        setMatches(response.data.matches);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();
    */

    //使用模拟数据
    setMatches(mockMatches);
    setLastUpdated(new Date().toLocaleTimeString());
    const intervalId = setInterval(() => {
        setMatches(mockMatches); // 更新模拟数据
        setLastUpdated(new Date().toLocaleTimeString()); // 更新时间
      }, 60000); // 每分钟更新一次

    //后端调用代码
    /*
    const intervalId = setInterval(fetchMatches, 60000); // 每分钟更新一次
    */

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="match-container">
      {matches.slice(0, 2).map((match, index) => (
        <div key={index} className="match">
          <div className="team-logo-name">
            <img src={match.team1Logo} alt={`${match.team1} logo`} />
            <span>{match.team1}</span>
            <span> vs </span>
            <img src={match.team2Logo} alt={`${match.team2} logo`} />
            <span>{match.team2}</span>
          </div>
          <div className="match-details">
            <p>Score: {match.score1} - {match.score2}</p>
            <p>{match.status}</p>
          </div>
          <time>{match.matchTime} </time>
        </div>
      ))}
      <p>Last Updated: {lastUpdated}</p>
      <button onClick={() => window.open('https://www.nba.com/schedule')}>
        Visit NBA Schedule
      </button>
    </div>
  );
  
  
  
  
  
  
  
};

export default BasketballMatchInfo;





//模拟的后端数据
const mockMatches: Match[] = [
    {
      team1Logo: 'https://upload.wikimedia.org/wikipedia/en/0/02/Houston_Rockets_logo.svg',
      team2Logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg',
      team1: 'Houston Rockets',
      team2: 'New York Knicks',
      score1: 110,
      score2: 99,
      status: '已结束',
      matchTime: '2023-10-04 19:00'
    },
    {
      team1Logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Los_Angeles_Lakers_logo.svg',
      team2Logo: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Golden_State_Warriors_logo.svg',
      team1: 'Los Angeles Lakers',
      team2: 'Golden State Warriors',
      score1: 102,
      score2: 94,
      status: '已结束',
      matchTime: '2023-10-04 19:00'
    },
    {
      team1Logo: 'https://upload.wikimedia.org/wikipedia/en/4/44/Boston_Celtics_logo.svg',
      team2Logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Chicago_Bulls_logo.svg',
      team1: 'Boston Celtics',
      team2: 'Chicago Bulls',
      score1: 88,
      score2: 93,
      status: '进行中',
      matchTime: '2024-05-04 19:00'
    },
    {
      team1Logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Denver_Nuggets_logo.svg',
      team2Logo: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Team_logo.svg',
      team1: 'Denver Nuggets',
      team2: 'Phoenix Suns',
      score1: 0,
      score2: 0,
      status: '未开始',
      matchTime: '2024-05-05 19:00'
    },
  ];