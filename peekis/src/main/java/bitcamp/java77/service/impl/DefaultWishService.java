package bitcamp.java77.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.WishDao;
import bitcamp.java77.domain.Wish;
import bitcamp.java77.service.WishService;

@Service
public class DefaultWishService implements WishService {
  @Autowired WishDao wishDao;
 
  public void register(Wish wish) {
	  wishDao.insert(wish);
  }
}







