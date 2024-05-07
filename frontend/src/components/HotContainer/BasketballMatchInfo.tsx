import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Basketball.css";


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

    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3000/basketballGames');
        setMatches(response.data.data.list);
        console.log(response.data.data.list);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();

    /*
    //使用模拟数据
    setMatches(mockMatches);
    setLastUpdated(new Date().toLocaleTimeString());
    const intervalId = setInterval(() => {
        setMatches(mockMatches); // 更新模拟数据
        setLastUpdated(new Date().toLocaleTimeString()); // 更新时间
      }, 60000); // 每分钟更新一次

    //后端调用代码
    */
    const intervalId = setInterval(fetchMatches, 60000); // 每分钟更新一次
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