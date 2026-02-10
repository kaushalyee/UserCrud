package com.example.userapi.service;

import com.example.userapi.exception.UserNotFoundException;
import com.example.userapi.model.User;
import com.example.userapi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public UserService(UserRepository repository) {
        this.userRepository = repository;
    }

    public User save(User user) {
        log.info("Saving user: email={}, name={}", user.getEmail(), user.getName());
        User saved = userRepository.save(user);
        log.info("User saved: id={}", saved.getId());
        return saved;
    }

    public List<User> findAll() {
        log.debug("Fetching all users");
        List<User> users = userRepository.findAll();
        log.debug("Fetched users count={}", users.size());
        return users;
    }

    public Optional<User> findById(Long id) {
        log.debug("Finding user by id={}", id);
        return userRepository.findById(id);
    }

    public void deleteById(Long id) {
        log.warn("Deleting user id={}", id);

        if (!userRepository.existsById(id)) {
            log.warn("Delete failed - user not found id={}", id);
            throw new UserNotFoundException(id);
        }

        userRepository.deleteById(id);
        log.info("User deleted id={}", id);
    }

    public User update(Long id, User update) {
        log.info("Updating user id={}", id);

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        existingUser.setName(update.getName());
        existingUser.setEmail(update.getEmail());
        existingUser.setPhone(update.getPhone());

        User saved = userRepository.save(existingUser);
        log.info("User updated id={}", saved.getId());
        return saved;
    }
}
