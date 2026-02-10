package com.example.userapi.controller;

import com.example.userapi.model.User;
import com.example.userapi.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public User create(@Valid @RequestBody User user) {
        log.info("CREATE user request: email={}, name={}", user.getEmail(), user.getName());
        User saved = userService.save(user);
        log.info("CREATE user success: id={}", saved.getId());
        return saved;
    }

    @GetMapping
    public List<User> findAll() {
        log.debug("GET ALL users request");
        List<User> users = userService.findAll();
        log.debug("GET ALL users success: count={}", users.size());
        return users;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        log.debug("GET user by id request: id={}", id);

        return userService.findById(id)
                .map(user -> {
                    log.debug("GET user by id success: id={}", id);
                    return ResponseEntity.ok(user);
                })
                .orElseGet(() -> {
                    log.warn("GET user by id NOT FOUND: id={}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody User user) {
        log.info("UPDATE user request: id={}, email={}", id, user.getEmail());
        User updated = userService.update(id, user);
        log.info("UPDATE user success: id={}", updated.getId());
        return updated;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        log.warn("DELETE user request: id={}", id);
        userService.deleteById(id);
        log.info("DELETE user success: id={}", id);
        return ResponseEntity.noContent().build();
    }
}
