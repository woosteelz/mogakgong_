package com.ssafy.mogakgong.controller;

import com.ssafy.mogakgong.domain.StudyPlanner;
import com.ssafy.mogakgong.service.StudyPlannerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/studyplanner")
@RequiredArgsConstructor
public class StudyPlannerController {

    private final StudyPlannerServiceImpl studyPlannerServiceImpl;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private Integer isExist = 1;

    // 스터디 플래너 작성
    @PostMapping("")
    public ResponseEntity<String> createStudyPlanner(@RequestBody StudyPlanner studyPlanner) {
        try {
            studyPlannerServiceImpl.write(studyPlanner);  // 데이터 저장
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    // 스터디 플래너 목록
    @GetMapping("/{memberId}")
    public ResponseEntity<Map<String, Object>> getStudyPlannerList(@PathVariable int memberId) {
        Map<String, Object> resultMap = new HashMap<>();

        List<StudyPlanner> studyPlanners = studyPlannerServiceImpl.findStudyPlanners(memberId, isExist);

        resultMap.put("info", studyPlanners);
        resultMap.put("message", SUCCESS);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    // 스터디 플래너 수정
    @PutMapping("/{memberId}")
    public ResponseEntity<String> updateMember(@PathVariable("memberId") Integer memberId, @RequestBody StudyPlanner studyPlanner) {
        studyPlannerServiceImpl.update(memberId, studyPlanner);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    // 스터디 플래너 탈퇴
    @DeleteMapping("/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable("memberId") Integer memberId) {
        studyPlannerServiceImpl.delete(memberId);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
