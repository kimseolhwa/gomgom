package bitcamp.java77.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.BoardDao;
import bitcamp.java77.domain.Board;
import bitcamp.java77.service.BoardService;

@Service
public class DefaultBoardService implements BoardService {
  @Autowired BoardDao boardDao;
  
  public void register(Board board) {
    boardDao.insert(board);
  }
  
}







